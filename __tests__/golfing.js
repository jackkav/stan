test('staircase', () => {
  const e = `     #\n    ##\n   ###\n  ####\n #####\n######`
  expect(staircase(1)).toEqual('#')
  expect(staircase(2)).toEqual(' #\n##')
  expect(staircase(3)).toEqual('  #\n ##\n###')
  expect(staircase(6)).toEqual(e)
})
const f = (n, c) => Array(n).fill(c).join``
function staircase(n) {
  const y = Array(n)
    .fill('1')
    .map((x, i) => `${f(n - i - 1, ' ') + f(i + 1, '#')}\n`)
  return y.join``.slice(0, -1)
}

const morse = `0  ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄
1 	▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄
2 	▄ ▄ ▄▄▄ ▄▄▄ ▄▄▄
3 	▄ ▄ ▄ ▄▄▄ ▄▄▄
4 	▄ ▄ ▄ ▄ ▄▄▄
5 	▄ ▄ ▄ ▄ ▄
6 	▄▄▄ ▄ ▄ ▄ ▄
7 	▄▄▄ ▄▄▄ ▄ ▄ ▄
8 	▄▄▄ ▄▄▄ ▄▄▄ ▄ ▄
9 	▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄
`
test('morse code and that', () => {
  // expect(numberToMorse(0)).toEqual('▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄')
  // expect(numberToMorse(1)).toEqual('▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄')
  // expect(numberToMorse(2)).toEqual('▄ ▄ ▄▄▄ ▄▄▄ ▄▄▄')
  // expect(numberToMorse(6)).toEqual('▄▄▄ ▄ ▄ ▄ ▄')
  expect(numberToMorse(9)).toEqual('▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄')
})

const numberToMorse = n => {
  const lookup = '▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄ ▄ ▄ ▄ ▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄'
  const begin = 10 - n
  const end = 15 - n
  return lookup.split` `.slice(begin, end).join` `
}

test('number from morse code', () => {
  expect(morseToNumber('▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄')).toEqual(0)
  expect(morseToNumber('▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄')).toEqual(1)
  expect(morseToNumber('▄ ▄ ▄▄▄ ▄▄▄ ▄▄▄')).toEqual(2)
  expect(morseToNumber('▄▄▄ ▄ ▄ ▄ ▄')).toEqual(6)
  expect(morseToNumber('▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄')).toEqual(9)
})

const morseToNumber = m => {
  const lookup = '▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄ ▄ ▄ ▄ ▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄'
  const numbers = [...Array(10).keys()] // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let r = 0
  numbers.forEach(x => {
    const n = lookup.split` `.slice(10 - x, 15 - x)
    if (n.join` ` === m) {
      r = x
    }
  })
  return r
}

const scriptArgs =
  '▄▄▄   ▄ ▄ ▄ ▄   ▄          ▄ ▄ ▄ ▄▄▄ ▄▄▄   ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄   ▄▄▄ ▄▄▄ ▄ ▄ ▄   ▄▄▄ ▄ ▄ ▄ ▄   ▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄          ▄▄▄ ▄▄▄ ▄ ▄▄▄   ▄ ▄ ▄▄▄   ▄ ▄   ▄▄▄ ▄ ▄▄▄ ▄   ▄▄▄ ▄ ▄▄▄          ▄▄▄ ▄ ▄ ▄   ▄ ▄▄▄ ▄   ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄▄▄ ▄▄▄   ▄▄▄ ▄          ▄ ▄ ▄▄▄ ▄   ▄▄▄ ▄▄▄ ▄▄▄   ▄▄▄ ▄ ▄ ▄▄▄   ▄   ▄ ▄ ▄          ▄ ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄ ▄▄▄   ▄▄▄ ▄▄▄   ▄ ▄▄▄ ▄▄▄ ▄          ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄ ▄ ▄▄▄   ▄   ▄ ▄▄▄ ▄          ▄▄▄   ▄ ▄ ▄ ▄   ▄          ▄ ▄ ▄ ▄ ▄▄▄   ▄ ▄ ▄ ▄ ▄   ▄▄▄ ▄▄▄ ▄▄▄ ▄ ▄   ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄ ▄▄▄   ▄ ▄ ▄▄▄ ▄▄▄ ▄▄▄          ▄ ▄▄▄ ▄ ▄   ▄ ▄▄▄   ▄▄▄ ▄▄▄ ▄ ▄   ▄▄▄ ▄ ▄▄▄ ▄▄▄          ▄▄▄ ▄ ▄   ▄▄▄ ▄▄▄ ▄▄▄   ▄▄▄ ▄▄▄ ▄   ▄ ▄ ▄'
const expected = 'THE 39761 QUICK BROWN FOXES JUMP OVER THE 45802 LAZY DOGS'

test('pull numbers', () => {
  expect(solve()).toEqual(expected)
})

const solve = () => {
  const words = String(scriptArgs).split`       `
  const first = words[1].trim()
  const second = words[8].trim()
  const firstNumber = first.split`   `.map(x => morseToNumber(x)).join``
  const secondNumber = second.split`   `.map(x => morseToNumber(x)).join``
  return `THE ${firstNumber} QUICK BROWN FOXES JUMP OVER THE ${secondNumber} LAZY DOGS`
}
