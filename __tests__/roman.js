test('RomanNumerals', () => {
  expect(RomanNumerals.toRoman(1000)).toEqual('M')
  expect(RomanNumerals.fromRoman('M')).toEqual(1000)
  expect(RomanNumerals.fromRomanRegex('M')).toEqual(1000)
  expect(RomanNumerals.fromRomanRegex('MMCCCLXXXII')).toEqual(2382)
  expect(RomanNumerals.fromRomanRegex('CD')).toEqual(400)
})
const RomanNumerals = {
  toRoman: x => {
    var d = [...(x + '')]
    var r = ''
    var i = 3
    var k = '0C0CC0CCC0CD0D0DC0DCC0DCCC0CM00X0XX0XXX0XL0L0LX0LXX0LXXX0XC00I0II0III0IV0V0VI0VII0VIII0IX'.split`0`
    while (i--) r = (k[+d.pop() + i * 10] || '') + r
    return Array(+d.join`` + 1).join`M` + r
  },
  fromRoman: s => {
    var g = {M: 1e3, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1}
    var o = Object.keys(g)
    const numerals = o.map(x => [x, g[x]])
    var v = 0
    numerals.forEach(n => {
      while (s.substr(0, n[0].length) == n[0]) {
        s = s.substr(n[0].length)
        v += n[1]
      }
    })
    return v
  },
  fromRomanRegex: n => {
    var g = {M: 1e3, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1}
    return n.match(/CM|CD|XC|XL|IX|IV|M|D|C|L|X|V|I/gi).reduce((acc, n) => acc + g[n], 0)
  },
}
