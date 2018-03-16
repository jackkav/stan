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

function bigSorting (arr) {
  return arr.sort((a, b) => +b <= +a)
}

test('12 hour dates and that', () => {
  expect(timeConversion('07:45:00PM')).toEqual('19:45:00')
  expect(timeConversion('12:45:00PM')).toEqual('12:45:00')
  expect(timeConversion('12:45:00AM')).toEqual('00:45:00')
})

function timeConversion (s) {
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
