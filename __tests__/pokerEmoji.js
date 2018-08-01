// U+1F0A1	          U+1F0B1            U+1F0C1     	U+1F0D1
// Ace of Spades	Ace of Hearts	Ace of Diamonds	Ace of Clubs = ABCD at position 4 second from end

const toEnglish = emoji => {
  let hex = emoji
    .codePointAt(0)
    .toString(16)
    .slice(-2)
  return hexToCard(hex[1]) + ' of ' + suit(hex[0])
}

const suit = l => (l === 'a' ? 'Spades' : l === 'b' ? 'Hearts' : l === 'c' ? 'Diamonds' : 'Clubs')

// toHex=e=>e.codePointAt(0).toString(16).slice(-2)
const toHex = emoji =>
  emoji
    .codePointAt(0)
    .toString(16)
    .slice(-2)

const hexToCard = hex => {
  let cards = ',Ace,Two,Three,Four,Five,Six,Seven,Eight,Nine,Ten,Jack,Knight,Queen,King'.split`,`
  let hexAsNumber = +('0x' + hex)
  return cards[hexAsNumber]
}
const toObject = cardEmoji => {
  let hex = toHex(cardEmoji)
  let index = +('0x' + hex[1])
  return {
    n: index >= 13 ? index - 1 : index === 1 ? 14 : index,
    suit: suit(hex[0]),
    card: hexToCard(hex[1]),
  }
}
const utilityFilter = (a, k, t) => a.filter(x => x.freq === k).length === t
const hasPair = arr => utilityFilter(arr, 2, 2)
const hasTwoPair = arr => utilityFilter(arr, 2, 4)
const hasFullHouse = arr => (hasThreeOfAKind(arr) && hasPair(arr)) || utilityFilter(arr, 3, 6)
const hasThreeOfAKind = arr => utilityFilter(arr, 3, 3)
const hasFourOfAKind = arr => utilityFilter(arr, 4, 4)
const hasFlush = arr => arr.filter(x => x.suitFreq >= 5).length >= 5
const hasStraight = arr => arr.filter(x => x.connectors).length === 5

const getConnectors = arr =>
  arr.map((n, i) => {
    const lowAce = n === 14 && arr[i - 1] === 5
    const conn = arr.includes(n + 1) || arr.includes(n - 1) || lowAce
    return {n, conn}
  })

const sortByHand = arr =>
  arr
    .sort((a, b) => b.n - a.n)
    .sort((a, b) => b.strength - a.strength)
    .sort((a, b) => b.freq - a.freq)
const toHand = cardEmojis => {
  const cardsAsObjects = [...cardEmojis].map(toObject)
  const debug = cardsAsObjects.map(x => x.card + ' of ' + x.suit)

  let freq = frequency(cardsAsObjects.map(x => x.card))
  let suitFreq = frequency(cardsAsObjects.map(x => x.suit))
  let connections = getConnectors(cardsAsObjects.sort((a, b) => a.n - b.n).map(x => x.n))
  let withFreq = cardsAsObjects.map((x, i, t) =>
    Object.assign(x, {
      freq: freq.find(y => y.c === x.card).f,
      suitFreq: suitFreq.find(y => y.c === x.suit).f,
      connectors: connections.find(y => y.n === x.n).conn,
    })
  )

  // console.log(debug, withFreq)
  if (hasStraight(withFreq)) {
    if (hasFlush(withFreq)) {
      const sorted = sortByHand(withFreq)
      if (sorted[0].card === 'Ace' && sorted[1].card === 'King') return 'Royal Flush'
      return 'Straight Flush'
    }
  }
  if (hasFourOfAKind(withFreq)) return 'Four of a Kind'
  if (hasFullHouse(withFreq)) return 'Full House'
  if (hasFlush(withFreq)) return 'Flush'
  if (hasStraight(withFreq)) return 'Straight'
  if (hasThreeOfAKind(withFreq)) return 'Three of a Kind'
  if (hasTwoPair(withFreq)) return 'Two Pair'

  if (hasPair(withFreq)) return 'Pair'

  return 'High Card'
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
test('pokerEmoji to english', () => {
  expect(toEnglish('🃊')).toEqual('Ten of Diamonds')
  expect(toEnglish('🃞')).toEqual('King of Clubs')
  expect(toEnglish('🂱')).toEqual('Ace of Hearts')
})

test('pokerEmojis to hand', () => {
  expect(toHand('🃁🂱🂷🃘🂤')).toEqual('Pair')
  expect(toHand('🂤🃔🃓🃝🃃')).toEqual('Two Pair')
  expect(toHand('🂴🃃🂨🃛🂢')).toEqual('High Card')
  expect(toHand('🃃🃇🃞🂧🃗')).toEqual('Three of a Kind')
  expect(toHand('🂫🃇🃋🃛🂻')).toEqual('Four of a Kind')
  expect(toHand('🂩🂢🂫🂨🂤')).toEqual('Flush')
  expect(toHand('🂪🃊🃙🂺🃉')).toEqual('Full House')
  expect(toHand('🃗🃔🃕🃖🃘')).toEqual('Straight Flush')
  expect(toHand('🃃🃅🃂🃁🃄')).toEqual('Straight Flush')
  expect(toHand('🃛🃝🃞🃚🃑')).toEqual('Royal Flush')
  expect(toHand('🃆🂵🂧🃙🃈')).toEqual('Straight')
  expect(toHand('🃔🂢🂳🃑🂵')).toEqual('Straight')
})
const matchEmojis = a => a.map(toHand).join`
`
test('pokerEmojis to hands', () => {
  expect(matchEmojis(['🃁🂱🂷🃘🂤', '🂤🃔🃓🃝🃃'])).toEqual(`Pair
Two Pair`)
})

test('connectors check', () => {
  expect(getConnectors([1, 2])).toEqual([{conn: true, n: 1}, {conn: true, n: 2}])
  expect(getConnectors([2, 4, 6])).toEqual([{conn: false, n: 2}, {conn: false, n: 4}, {conn: false, n: 6}])
  expect(getConnectors([2, 4, 6])).toEqual([{conn: false, n: 2}, {conn: false, n: 4}, {conn: false, n: 6}])
})

test('aces are high and low?', () => {
  expect(getConnectors([10, 11, 12, 13, 14])).toEqual([
    {conn: true, n: 10},
    {conn: true, n: 11},
    {conn: true, n: 12},
    {conn: true, n: 13},
    {conn: true, n: 14},
  ])
  expect(getConnectors([2, 3, 4, 5, 14])).toEqual([
    {conn: true, n: 2},
    {conn: true, n: 3},
    {conn: true, n: 4},
    {conn: true, n: 5},
    {conn: true, n: 14},
  ])
})
