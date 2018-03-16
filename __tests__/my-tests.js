test('truthy stuff', () => {
  expect(1).toBeTruthy()
  expect(' ').toBeTruthy()
})

test('falsy stuff', () => {
  expect('').toBeFalsy()
  expect(0).toBeFalsy()
  expect(null).toBeFalsy()
})

test('objects are a thing even when empty', () => {
  expect({}).toBeTruthy()
})

test('arrays are implemented as objects, thus also a thing', () => {
  expect([]).toBeTruthy()
})

test('arrays can be wierd', () => {
  let arr = Array(2).fill([0, 0])
  arr[1][1] = 1
  expect(arr[1][1]).toBeTruthy()
})

test('who`s your NaN', () => {
  expect(isNaN()).toBeTruthy()
  expect(isNaN(NaN)).toBeTruthy()
  expect(isNaN(9)).toBeFalsy()
})

test('sort numbers and that', () => {
  const input = [31415926535897932384626433832795, 0.1, 3, 10, 3, 5]
  const expected = [0.1, 3, 3, 5, 10, 31415926535897932384626433832795]
  expect(bigSorting(input)).toEqual(expected)
})

function bigSorting(arr) {
  return arr.sort((a, b) => +b <= +a)
}

test('12 hour dates and that', () => {
  expect(timeConversion('07:45:00PM')).toEqual('19:45:00')
  expect(timeConversion('12:45:00PM')).toEqual('12:45:00')
  expect(timeConversion('12:45:00AM')).toEqual('00:45:00')
})

function timeConversion(s) {
  const midday = '12'
  const midnight = '00'
  const isAM = s[8] !== 'P'
  const isTwelve = s.slice(0, 2) === '12'
  const isMidday = !isAM && isTwelve
  const isMidnight = isAM && isTwelve
  const hours = +s.slice(0, 2)
  const minutesAndSeconds = s.slice(2, 8)
  if (isMidday) return midday + minutesAndSeconds
  if (isMidnight) return midnight + minutesAndSeconds
  return isAM ? s.slice(0, 8) : hours + 12 + minutesAndSeconds
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
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  // return numbers.reduce((c, x) => {
  //   if (lookup.slice(10 - x, 15 - x).join` ` === m) return x
  //   return 0 + c
  // })
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

test('averages', () => {
  expect(averages(6, [-4, 3, -9, 0, 4, 1])).toEqual([0.5, 0.333333, 0.166667])
})
const averages = (size, arr) => {
  const postive = arr.filter(x => x > 0).length / size
  const negative = arr.filter(x => x < 0).length / size
  const zeros = arr.filter(x => x === 0).length / size
  return [+postive.toFixed(6), +negative.toFixed(6), +zeros.toFixed(6)]
}
