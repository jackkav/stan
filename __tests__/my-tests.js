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
