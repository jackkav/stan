const red = '#ff0000'
const aqua = '#00ffff'
const green = '#00ff00'
const fuschia = '#ff00ff'
const blue = '#0000ff'
const yellow = '#ffff00'
const white = '#000000'
const black = '#ffffff'
// can convert hex to decimal
test('colors', () => {
  expect(getRed(red.slice(1))).toEqual(255)
  expect(getRed(green.slice(1))).toEqual(0)
  expect(getGreen(green.slice(1))).toEqual(255)
  expect(getGreen(blue.slice(1))).toEqual(0)
  expect(getBlue(blue.slice(1))).toEqual(255)
  expect(getBlue(red.slice(1))).toEqual(0)
  expect(hex2rgb(red.slice(1))).toEqual([255, 0, 0])
  expect(rgb2hex([255, 0, 0])).toEqual(red.slice(1))
})

const rgb = hex => parseInt(hex, 16)
const getRed = hex => (rgb(hex) >> 16) & 0xff // returns 255
const getGreen = hex => (rgb(hex) >> 8) & 0xff // 170
const getBlue = hex => rgb(hex) & 0xff // 221
const hex2rgb = hex => [(parseInt(hex, 16) >> 16) & 0xff, (parseInt(hex, 16) >> 8) & 0xff, parseInt(hex, 16) & 0xff]
const rgb2hex = rgb =>
  rgb
    .map(c => c.toString(16))
    .map(c => (c.length === 1 ? '0' + c : c))
    .reduce((c, a) => c + a, '')
// const rgbToYIQ = ({r, g, b}) => (r * 299 + g * 587 + b * 114) / 1000

// const contrast = (colorHex, threshold = 128) =>
//   colorHex === undefined
//     ? '#000'
//     : hex2rgb(colorHex) === undefined
//     ? '#000'
//     : rgbToYIQ(hex2rgb(colorHex).every(x => x >= threshold) ? '#000' : '#fff')
// test('contrasting colors', () => {
//   expect(contrast(white.slice(1))).toEqual(randomColor())
// })
const randomColor = () => '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
test('random colors', () => {
  expect(randomColor()).not.toBe(randomColor())
})
test('invert colors', () => {
  expect(invertColor(white)).toEqual(black)
  expect(invertColor(black)).toEqual(white)
  expect(invertColor(red)).toEqual(aqua)
  expect(invertColor(green)).toEqual(fuschia)
  expect(invertColor(blue)).toEqual(yellow)
})
function invertColor(hex) {
  if (hex.length === 7) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  // invert color components
  let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16)
  let g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16)
  let b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}
function padZero(str, len) {
  len = len || 2
  var zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}
