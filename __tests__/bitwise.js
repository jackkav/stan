// bitwise tricks to baffle

// 1100 & 1111 = 1100
// 1100 | 1111 = 1111
// 1100 ^ 1111 = 0011
// 1100 >> 1 = 110
// 1100 >> 2 = 11
// 1100 << 1 = 11000
// 1100 << 2 = 110000

// AND &
// similar to % 2 in outcome
test('is odd or not', () => {
  expect(isOdd(5)).toBeTruthy()
  expect(isOdd(6)).toBeFalsy()
  expect(isEven(5)).toBeFalsy()
  expect(isEven(6)).toBeTruthy()
})

const isOdd = n => n & 1
const isEven = n => !(n & 1)

// NOT ~
// flips the bits and add one
// since ES6 includes, now useless
test('includes', () => {
  expect(includes(5)).toEqual(-6)
  expect(includes(-6)).toEqual(5)
  expect('123'.indexOf('4')).toEqual(-1)
  expect(includes('123'.indexOf('4'))).toBeFalsy()
  expect(includes('123'.indexOf('3'))).toBeTruthy()
})

const includes = n => ~n

// can convert hex to decimal
test('colors', () => {
  const r = '#ff0000'.slice(1)
  const g = '#00ff00'.slice(1)
  const b = '#0000ff'.slice(1)
  expect(red(r)).toEqual(255)
  expect(red(g)).toEqual(0)
  expect(green(g)).toEqual(255)
  expect(green(r)).toEqual(0)
  expect(blue(b)).toEqual(255)
})

const rgb = hex => parseInt(hex, 16)
const red = hex => (rgb(hex) >> 16) & 0xff // returns 255
const green = hex => (rgb(hex) >> 8) & 0xff // 170
const blue = hex => rgb(hex) & 0xff // 221

// shift bits
test('shift bits', () => {
  const n = 12 // 1100
  const el = 6 // 110
  const er = 24 // 11000
  expect(shiftBitLeft(n)).toEqual(el)
  expect(shiftBitRight(n)).toEqual(er)
})

const shiftBitLeft = n => n >> 1
const shiftBitRight = n => n << 1

// merge bits
test('merge bits', () => {
  const n = 12 // 1100
  const m = 3 // 0011
  const e = 15 // 1111
  expect(mergeBits(n, m)).toEqual(e)
})

const mergeBits = (n, m) => n | m
