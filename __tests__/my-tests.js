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

test('arrays have tricks for selecting the beginning or end', () => {
  const a = [1, 2, 3, 4, 5, 6]
  const [f, , , , , l] = a
  expect(f).toEqual(1)
  expect(l).toEqual(6)

  const [first, second, third, ...rest] = a
  expect(first).toEqual(1)
  expect(second).toEqual(2)
  expect(third).toEqual(3)
  expect(rest).toEqual([4, 5, 6])

  const {[a.length - 1]: last} = a
  expect(last).toEqual(6)
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

test('minMax', () => {
  expect(minMax('1 2 3 4 5')).toEqual('10 14')
  expect(minMax('5 5 5 5 5')).toEqual('20 20')
})

const minMax = s => {
  const arr = s.split(' ')
  const totals = arr.map(x => {
    const filter = arr.filter(y => y !== x)
    if (!filter.length) return arr.slice(1).reduce((c, a) => +a + +c)
    return filter.reduce((c, a) => +a + +c)
  })
  return `${Math.min(...totals)} ${Math.max(...totals)}`
}

test('minMax unfairness', () => {
  expect(minMaxUnfair([7, 2, 1, 4, 7, 2])).toEqual(1)
  expect(minMaxUnfair([7, 3, 10, 100, 300, 200, 1000, 20, 30])).toEqual(20)
  expect(minMaxUnfair([10, 4, 1, 2, 3, 4, 10, 20, 30, 40, 100, 200])).toEqual(3)
  // expect(minMaxUnfair(minMaxUnfairTestData.split``.filter(x => x))).toEqual(89733159)
})

const minMaxUnfair = s => {
  const [n, k, ...arr] = s
  const two = arr
    .sort((a, b) => b - a)
    .reverse()
    .slice(0, k)
  return Math.max(...two) - Math.min(...two)
}
