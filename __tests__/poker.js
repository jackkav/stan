const toDecimal = n => (n === 'J' && 10) || (n === 'Q' && 11) || (n === 'K' && 12) || (n === 'A' && 13) || +n

function hand(holeCards, communityCards) {
  let hole = holeCards.map(x => ({card: x[0], n: toDecimal(x[0]), suit: x[1]}))

  let community = communityCards.map(x => ({card: x[0], n: toDecimal(x[0]), suit: x[1]}))

  let sevenCards = [...hole, ...community]
  let freq = frequency(sevenCards.map(x => x.card[0]))

  let withFreq = sevenCards.map(x => ({...x, freq: freq.filter(y => y.c === x.card)[0].f}))

  let handGuess = 'nothing'
  hasPair(withFreq) && (handGuess = 'pair')
  hasTwoPair(withFreq) && (handGuess = 'two pair')
  hasThreeOfAKind(withFreq) && (handGuess = 'three-of-a-kind')
  hasFourOfAKind(withFreq) && (handGuess = 'four-of-a-kind')
  hasFullHouse(withFreq) && (handGuess = 'full house')
  // console.log(withFreq, hasFlush(withFreq))
  let [a, b, c, d, e] = [...hole, ...community].sort((a, b) => b.n - a.n)
  let ranks = [...new Set([a, b, c, d, e].map(x => x.card))]

  return {type: handGuess, ranks}
}
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
const hasPair = arr => {
  return arr.filter(x => x.freq === 2).length === 2
}
const hasTwoPair = arr => {
  return arr.filter(x => x.freq === 2).length === 4
}
const hasThreeOfAKind = arr => {
  return arr.filter(x => x.freq === 3).length === 3
}
const hasFourOfAKind = arr => {
  return arr.filter(x => x.freq === 4).length === 4
}
const hasStraight = arr => {
  return false
}
const hasFlush = arr => {
  return frequency(arr.map(x => x.suit)).filter(x => x.f === 5).length === 5
}
const hasStraightFlush = arr => {
  return false
}
const hasFullHouse = arr => {
  return arr.filter(x => x.freq === 3 || x.freq === 2).length === 5
}

test('poker', () => {
  expect({type: 'nothing', ranks: ['A', 'K', 'Q', 'J', '9']}).toEqual(
    hand(['K♠', 'A♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦'])
  )
  expect({type: 'pair', ranks: ['K', 'Q', 'J', '9']}).toEqual(hand(['K♠', 'Q♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']))
  // expect({type: 'pair', ranks: ['Q', 'K', 'J', '9']}).toEqual(hand(['K♠', 'Q♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']))
  expect({type: 'two pair', ranks: ['K', 'J', '9']}).toEqual(hand(['K♠', 'J♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']))
  expect({type: 'three-of-a-kind', ranks: ['Q', 'J', '9']}).toEqual(hand(['4♠', '9♦'], ['J♣', 'Q♥', 'Q♠', '2♥', 'Q♦']))
  // expect({type: 'straight', ranks: ['K', 'Q', 'J', '10', '9']}).toEqual(
  //   hand(['Q♠', '2♦'], ['J♣', '10♥', '9♥', 'K♥', '3♦'])
  // )
  // expect({type: 'flush', ranks: ['Q', 'J', '10', '5', '3']}).toEqual(
  //   hand(['A♠', 'K♦'], ['J♥', '5♥', '10♥', 'Q♥', '3♥'])
  // )
  expect({type: 'full house', ranks: ['A', 'K']}).toEqual(hand(['A♠', 'A♦'], ['K♣', 'K♥', 'A♥', 'Q♥', '3♦']))
  expect({type: 'four-of-a-kind', ranks: ['3', '2']}).toEqual(hand(['2♠', '3♦'], ['3♣', '2♥', '3♠', '3♥', '2♦']))
  // expect({type: 'four-of-a-kind', ranks: ['2', '3']}).toEqual(hand(['2♠', '3♦'], ['2♣', '2♥', '3♠', '3♥', '2♦']))
  // expect({type: 'straight-flush', ranks: ['J', '10', '9', '8', '7']}).toEqual(
  //   hand(['8♠', '6♠'], ['7♠', '5♠', '9♠', 'J♠', '10♠'])
  // )
})
