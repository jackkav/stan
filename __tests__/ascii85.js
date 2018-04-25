test('toAscii85', () => {
  expect('easy'.toAscii85()).toEqual('<~ARTY*~>')
  expect('somewhat difficult'.toAscii85()).toEqual('<~F)Po,GA(E,+Co1uAnbatCif~>')
  expect('bart\u0000\u0000\u0000\u0000\u0000simpson'.toAscii85()).toEqual('<~@UX;!z!-;jkE-#r8~>')

  expect('<~ARTY*~>'.fromAscii85()).toEqual('easy')
})

String.prototype.toAscii85 = function() {
  var encode = function(s) {
    var length = s.length + 1
    var base256digits = s
      .split('')
      .map(c => (c && c.charCodeAt(0)) || 0)
      .concat([0, 0, 0, 0])
      .slice(0, 4)
    var n = base256digits.reduce((s, v) => s * 256 + v, 0)
    for (var base85digits = [], i = 5; i > 0; i--, n = Math.floor(n / 85)) {
      base85digits.unshift(n % 85 + 33)
    }
    if (base85digits.every(v => v == 33) && length == 5) return 'z'
    return base85digits
      .map(v => String.fromCharCode(v))
      .join('')
      .slice(0, length)
  }
  for (var i = 0, s = ''; i < this.length; i += 4) {
    s += encode(this.slice(i, i + 4))
  }
  return '<~' + s + '~>'
}

String.prototype.fromAscii85 = function() {
  var text85 = this.slice(2, -2).replace(/\s*/g, '')
  var decode = function(s) {
    if (s == 'z') return '\0\0\0\0'
    var length = s.length - 1
    var base85digits = s
      .split('')
      .map(c => c.charCodeAt(0) - 33)
      .concat([0, 0, 0, 0, 0])
      .slice(0, 5)
    var n = base85digits.reduce((s, v) => s * 85 + v, 0)
    for (var base256digits = [], i = 4; i > 0; i--, n = Math.floor(n / 256)) {
      base256digits.unshift(n % 256)
    }
    if (base256digits.length > length && base256digits[length] > 0) base256digits[length - 1]++
    return base256digits
      .map(v => String.fromCharCode(v))
      .join('')
      .slice(0, length)
  }
  for (var i = 0, s = ''; i < text85.length; ) {
    if (text85[i] == 'z') {
      s += decode(text85[i])
      i++
    } else {
      s += decode(text85.slice(i, i + 5))
      i += 5
    }
  }
  return s
}
