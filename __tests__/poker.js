const toDecimal = n => (n === 'J' && 11) || (n === 'Q' && 12) || (n === 'K' && 13) || (n === 'A' && 14) || +n

function hand(holeCards, communityCards) {
  let hole = holeCards.map(x => ({
    card: getCard(x),
    n: toDecimal(getCard(x)),
    suit: getSuit(x),
    hand: 'nothing',
    strength: 0,
    connectors: 0,
  }))
  let community = communityCards.map(x => ({
    card: getCard(x),
    n: toDecimal(getCard(x)),
    suit: getSuit(x),
    hand: 'nothing',
    strength: 0,
    connectors: 0,
  }))

  let sevenCards = [...hole, ...community]
  let freq = frequency(sevenCards.map(x => x.card))
  let suitFreq = frequency(sevenCards.map(x => x.suit))
  let connections = getConnectors(sevenCards.map(x => x.n).sort((a, b) => a - b))
  let withFreq = sevenCards.map((x, i, t) =>
    Object.assign(x, {
      freq: freq.filter(y => y.c === x.card)[0].f,
      suitFreq: suitFreq.filter(y => y.c === x.suit)[0].f,
      connectors: connections.filter(y => y.n === x.n)[0].conn,
    })
  )

  withFreq = findHands(withFreq)
  let [a, b, c, d, e] = sortByHand(withFreq)
  let ranks = [...new Set([a, b, c, d, e].map(x => x.card))]
  return {type: a.hand, ranks}
}
const sortByHand = arr =>
  arr
    .sort((a, b) => b.n - a.n)
    .sort((a, b) => b.strength - a.strength)
    .sort((a, b) => b.freq - a.freq)
const getConnectors = arr =>
  arr.map((x, y, z) => ({
    n: +x,
    conn: +z[y + 1] === +x + 1 && +z[y - 1] === +x - 1 ? 2 : +z[y + 1] === +x + 1 || +z[y - 1] === +x - 1 ? 1 : 0,
  }))
const getCard = i => i.slice(0, -1)
const getSuit = i => i.slice(-1)
const frequency = arr => {
  let a = []
  let b = []
  let prev

  arr.sort()
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i])
      b.push(1)
    } else b[b.length - 1]++
    prev = arr[i]
  }

  return a.map((x, i) => ({c: x, f: b[i]}))
}
const findHands = arr => {
  if (hasStraight(arr)) {
    const top5 = sortByHand(arr).slice(0, -2)

    if (hasFlush(top5)) {
      if (top5[0].card === 'A')
        return top5.map(x => (x.suitFreq >= 5 ? Object.assign(x, {hand: 'royal-flush', strength: 9}) : x))
      return top5.map(x => (x.suitFreq >= 5 ? Object.assign(x, {hand: 'straight-flush', strength: 8}) : x))
    }
  }

  if (hasFourOfAKind(arr))
    return arr.map(x => (x.freq === 4 ? Object.assign(x, {hand: 'four-of-a-kind', strength: 7}) : x))
  if (hasFullHouse(arr))
    return arr.map(x => (x.freq === 3 || x.freq === 2 ? Object.assign(x, {hand: 'full house', strength: 6}) : x))
  if (hasFlush(arr)) return arr.map(x => (x.suitFreq >= 5 ? Object.assign(x, {hand: 'flush', strength: 5}) : x))
  if (hasStraight(arr)) return arr.map(x => (x.connectors >= 1 ? Object.assign(x, {hand: 'straight', strength: 4}) : x))
  if (hasThreeOfAKind(arr))
    return arr.map(x => (x.freq === 3 ? Object.assign(x, {hand: 'three-of-a-kind', strength: 3}) : x))
  if (hasTwoPair(arr)) return arr.map(x => (x.freq === 2 ? Object.assign(x, {hand: 'two pair', strength: 2}) : x))
  if (hasPair(arr)) return arr.map(x => (x.freq === 2 ? Object.assign(x, {hand: 'pair', strength: 1}) : x))
  return arr
}
const hasPair = arr => {
  return arr.filter(x => x.freq === 2).length === 2
}
const hasTwoPair = arr => {
  return arr.filter(x => x.freq === 2).length === 4
}
const hasFullHouse = arr => {
  return (hasThreeOfAKind(arr) && hasPair(arr)) || arr.filter(x => x.freq === 3).length === 6
}
const hasThreeOfAKind = arr => {
  return arr.filter(x => x.freq === 3).length === 3
}
const hasFourOfAKind = arr => {
  return arr.filter(x => x.freq === 4).length === 4
}
const hasFlush = arr => {
  return arr.filter(x => x.suitFreq >= 5).length >= 5
}
const hasStraight = arr => {
  return arr.filter(x => x.connectors === 2).length > 2
}

test('poker', () => {
  expect({type: 'nothing', ranks: ['A', 'K', 'Q', 'J', '9']}).toEqual(
    hand(['K♠', 'A♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦'])
  )
  expect({type: 'pair', ranks: ['Q', 'K', 'J', '9']}).toEqual(hand(['K♠', 'Q♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']))
  expect({type: 'pair', ranks: ['K', 'Q', 'J', '9']}).toEqual(hand(['K♠', 'Q♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']))
  expect({type: 'two pair', ranks: ['K', 'J', '9']}).toEqual(hand(['K♠', 'J♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']))
  expect({type: 'three-of-a-kind', ranks: ['Q', 'J', '9']}).toEqual(hand(['4♠', '9♦'], ['J♣', 'Q♥', 'Q♠', '2♥', 'Q♦']))
  expect({type: 'straight', ranks: ['K', 'Q', 'J', '10', '9']}).toEqual(
    hand(['Q♠', '2♦'], ['J♣', '10♥', '9♥', 'K♥', '3♦'])
  )
  expect({type: 'flush', ranks: ['Q', 'J', '10', '5', '3']}).toEqual(
    hand(['A♠', 'K♦'], ['J♥', '5♥', '10♥', 'Q♥', '3♥'])
  )
  expect({type: 'royal-flush', ranks: ['A', 'K', 'Q', 'J', '10']}).toEqual(
    hand(['A♦', 'K♦'], ['J♦', '5♥', '10♦', 'Q♦', '3♥'])
  )
  expect({type: 'full house', ranks: ['A', 'K']}).toEqual(hand(['A♠', 'A♦'], ['K♣', 'K♥', 'A♥', 'Q♥', '3♦']))
  expect({type: 'full house', ranks: ['10', 'K']}).toEqual(hand(['10♠', '10♦'], ['K♣', 'K♥', '10♥', 'Q♥', '3♦']))
  expect({type: 'full house', ranks: ['9', '7']}).toEqual(hand(['9♠', '9♦'], ['7♣', '2♥', '7♥', '9♥', '7♦']))
  expect({type: 'four-of-a-kind', ranks: ['3', '2']}).toEqual(hand(['2♠', '3♦'], ['3♣', '2♥', '3♠', '3♥', '2♦']))
  expect({type: 'four-of-a-kind', ranks: ['2', '3']}).toEqual(hand(['2♠', '3♦'], ['2♣', '2♥', '3♠', '3♥', '2♦']))
  expect({type: 'straight-flush', ranks: ['J', '10', '9', '8', '7']}).toEqual(
    hand(['8♠', '6♠'], ['7♠', '5♠', '9♠', 'J♠', '10♠'])
  )
})
