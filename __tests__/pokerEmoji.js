// U+1F0A1	          U+1F0B1            U+1F0C1     	U+1F0D1
// Ace of Spades	Ace of Hearts	Ace of Diamonds	Ace of Clubs = ABCD at position 4 second from end
const suit = l => {
  if (l === 'a') return 'Spades'
  if (l === 'b') return 'Hearts'
  if (l === 'c') return 'Diamonds'
  if (l === 'd') return 'Clubs'
}
const toEnglish = emoji => {
  let hex = emoji
    .codePointAt(0)
    .toString(16)
    .slice(-2)
  return hexToCard(hex[1]) + ' of ' + suit(hex[0])
}
const hexToCard = hex => {
  let cards = ',Ace,Two,Three,Four,Five,Six,Seven,Eight,Nine,Ten,Jack,Queen,King'.split`,`
  let hexAsNumber = +('0x' + hex)
  return cards[hexAsNumber]
}

test('pokerEmoji', () => {
  expect(toEnglish('🃊')).toEqual('Ten of Diamonds')
})
