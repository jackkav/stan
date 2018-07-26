// U+1F0A1	          U+1F0B1            U+1F0C1     	U+1F0D1
// Ace of Spades	Ace of Hearts	Ace of Diamonds	Ace of Clubs = ABCD at position 4 second from end
const suit = l => (l === 'a' ? 'Spades' : l === 'b' ? 'Hearts' : l === 'c' ? 'Diamonds' : l === 'd' ? 'Clubs' : null)

const toHex = emoji =>
  emoji
    .codePointAt(0)
    .toString(16)
    .slice(-2)

const toEnglish = emoji => {
  let hex = emoji
    .codePointAt(0)
    .toString(16)
    .slice(-2)
  return hexToCard(hex[1]) + ' of ' + suit(hex[0])
}
const hexToCard = hex => {
  let cards = ',Ace,Two,Three,Four,Five,Six,Seven,Eight,Nine,Ten,Jack,Knight,Queen,King'.split`,`
  let hexAsNumber = +('0x' + hex)
  return cards[hexAsNumber]
}
const toObject = cardEmoji => {
  let hex = toHex(cardEmoji)
  let index = +('0x' + hex[1])
  return {
    name: toEnglish(cardEmoji),
    n: index >= 13 ? index - 1 : index === 1 ? 14 : index,
    suit: suit(hex[0]),
    card: hexToCard(hex[1]),
  }
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
const getConnectors = arr =>
  arr.map((x, y, z) => ({
    n: +x,
    conn: +z[y + 1] === +x + 1 && +z[y - 1] === +x - 1 ? 2 : +z[y + 1] === +x + 1 || +z[y - 1] === +x - 1 ? 1 : 0,
  }))
const sortByHand = arr =>
  arr
    .sort((a, b) => b.n - a.n)
    .sort((a, b) => b.strength - a.strength)
    .sort((a, b) => b.freq - a.freq)
const toHand = cardEmojis => {
  const cardsAsObjects = [...cardEmojis].map(toObject)
  let freq = frequency(cardsAsObjects.map(x => x.card))
  let suitFreq = frequency(cardsAsObjects.map(x => x.suit))
  let connections = getConnectors(cardsAsObjects.map(x => x.n).sort((a, b) => a - b))
  let withFreq = cardsAsObjects.map((x, i, t) =>
    Object.assign(x, {
      freq: freq.filter(y => y.c === x.card)[0].f,
      suitFreq: suitFreq.filter(y => y.c === x.suit)[0].f,
      connectors: connections.filter(y => y.n === x.n)[0].conn,
    })
  )

  if (hasStraight(withFreq)) {
    const top5 = sortByHand(withFreq)
    if (hasFlush(top5)) {
      if (top5[0].card === 'Ace') return 'Royal Flush'
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
  expect(toHand('🃛🃝🃞🃚🃑')).toEqual('Royal Flush')
  expect(toHand('🃆🂵🂧🃙🃈')).toEqual('Straight')
})
const matchEmojis = a => a.map(toHand).join`
`
test('pokerEmojis to hands', () => {
  expect(matchEmojis(['🃁🂱🂷🃘🂤', '🂤🃔🃓🃝🃃'])).toEqual(`Pair
Two Pair`)
})
