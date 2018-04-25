var alphabet = {
  a: '.-',
  b: '-...',
  c: '-.-.',
  d: '-..',
  e: '.',
  f: '..-.',
  g: '--.',
  h: '....',
  i: '..',
  j: '.---',
  k: '-.-',
  l: '.-..',
  m: '--',
  n: '-.',
  o: '---',
  p: '.--.',
  q: '--.-',
  r: '.-.',
  s: '...',
  t: '-',
  u: '..-',
  v: '...-',
  w: '.--',
  x: '-..-',
  y: '-.--',
  z: '--..',
  ' ': '/',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
}

morseEncode = s =>
  s.split`` // Transform the string into an array: ['T', 'h', 'i', 's'...
    .map(
      e => alphabet[e.toLowerCase()] || '' // Lowercase only, ignore unknown characters.
    ).join` ` // Convert the array back to a string.
    .replace(/ +/g, ' ') // Replace double spaces that may occur when unknow characters were in the source string.

test('morse encode', () => {
  expect(morseEncode('VEX JIGS')).toEqual('...- . -..- / .--- .. --. ...')
  expect(morseEncode('1 2 3 4 5')).toEqual('.---- / ..--- / ...-- / ....- / .....')
  expect(morseEncode('This is a sentence containing numbers: 1 2 3 4 5')).toEqual(
    '- .... .. ... / .. ... / .- / ... . -. - . -. -.-. . / -.-. --- -. - .- .. -. .. -. --. / -. ..- -- -... . .-. ... / .---- / ..--- / ...-- / ....- / .....'
  )
})
morseDecode = s => {
  messageConverted = []
  s.split('   ').map(function(word) {
    word.split(' ').map(function(letter) {
      messageConverted.push(ralphabet[letter])
    })
    messageConverted.push(' ')
  })
  return messageConverted.join``.trim()
}
var invert = function(obj) {
  var new_obj = {}
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      new_obj[obj[prop]] = prop
    }
  }
  return new_obj
}
const ralphabet = invert(alphabet)

test('morse decode', () => {
  expect(morseDecode('...- . -..- / .--- .. --. ...')).toEqual('vex jigs')
  // expect(morseEncode('1 2 3 4 5')).toEqual('.---- / ..--- / ...-- / ....- / .....')
  // expect(morseEncode('This is a sentence containing numbers: 1 2 3 4 5')).toEqual(
  //   '- .... .. ... / .. ... / .- / ... . -. - . -. -.-. . / -.-. --- -. - .- .. -. .. -. --. / -. ..- -- -... . .-. ... / .---- / ..--- / ...-- / ....- / .....'
  // )
})
morseEncodeGolf = s =>
  s.split`` // Transform the string into an array: ['T', 'h', 'i', 's'...
    .map(
      e => alphabet[e.toLowerCase()] || '' // Lowercase only, ignore unknown characters.
    ).join`  ` // Convert the array back to a string.
    .replace(/\//g, '     ')
    .replace(/\./g, '▄ ')
    .replace(/\-/g, '▄▄▄ ')
    .trim()
test('morse encode golf', () => {
  expect(morseEncodeGolf('VEX JIGS')).toEqual(
    '▄ ▄ ▄ ▄▄▄   ▄   ▄▄▄ ▄ ▄ ▄▄▄          ▄ ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄   ▄▄▄ ▄▄▄ ▄   ▄ ▄ ▄'
  )
  expect(morseEncodeGolf('12345')).toEqual(
    '▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄ ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄ ▄ ▄▄▄ ▄▄▄   ▄ ▄ ▄ ▄ ▄▄▄   ▄ ▄ ▄ ▄ ▄'
  )
})
morseDecodeGolf = s => {
  s = s
    .replace(/▄▄▄ /g, '-')
    .replace(/▄ /g, '.')
    .replace(/▄/g, '.')
    .replace(/         /g, ' / ')
  // console.log(s)
  return s.split`   `.map(w => w.split` `.map(l => ralphabet[l]).join`` + ' ').join``.trim()
}
test('morse decode golf', () => {
  expect(morseDecodeGolf('▄ ▄ ▄ ▄▄▄   ▄   ▄▄▄ ▄ ▄ ▄▄▄          ▄ ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄   ▄▄▄ ▄▄▄ ▄   ▄ ▄ ▄')).toEqual(
    'vex jigs'
  )
  expect(morseDecodeGolf('▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄ ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄ ▄ ▄▄▄ ▄▄▄   ▄ ▄ ▄ ▄ ▄▄▄   ▄ ▄ ▄ ▄ ▄')).toEqual(
    '12345'
  )
})

const lookup = {
  E: '0',
  T: '1',
  I: '00',
  A: '01',
  N: '10',
  M: '11',
  S: '000',
  U: '001',
  R: '010',
  W: '011',
  D: '100',
  K: '101',
  G: '110',
  O: '111',
  H: '0000',
  V: '0001',
  F: '0010',
  1: '0011',
  L: '0100',
  2: '0101',
  P: '0110',
  J: '0111',
  B: '1000',
  X: '1001',
  C: '1010',
  Y: '1011',
  Z: '1100',
  Q: '1101',
  3: '1110',
  4: '1111',
}

test('generate a morse code lookup table', () => {
  expect(makeLookup()).toEqual(lookup)
})

const makeLookup = () =>
  Object.assign(
    ...Object.entries([...'ETIANMSURWDKGOHVF1L2PJBXCYZQ34']).map(([i, v]) => ({
      [v]: toBinary(...(i > 13 ? [i - 14, 4] : i > 5 ? [i - 6, 3] : i > 1 ? [i - 2, 2] : [i, 0])),
    }))
  )

const toBinary = (i, s) => {
  return i.toString(2).padStart(s, '0')
}

// // golfed
const m = () => {
  s = [...'ETIANMSURWDKGOHVF1L2PJBXCYZQ34']
  r = {}
  for (i = 0; i < 30; i++) {
    i < 2
      ? (r[s[i]] = '' + i)
      : i < 6
        ? (r[s[i]] = b(i - 2, 2))
        : i < 14 ? (r[s[i]] = b(i - 6, 3)) : i < 29 ? (r[s[i]] = b(i - 14, 4)) : (r[s[i]] = '')
  }
}
b = (i, s) => i.toString(2).padStart(s, '0')
