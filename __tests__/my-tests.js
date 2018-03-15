test('Test1', () => {
  expect(1).toBeTruthy()
})

test('Test2', () => {
  expect([]).toBeTruthy()
})

test('Test3', () => {
  expect('').toBeFalsy()
})

test('Test4', () => {
  expect({}).toBeTruthy()
})

test('Test5', () => {
  expect(0).toBeFalsy()
})

test('Test array', () => {
  let arr = Array(2).fill([0.0])
  arr[1][1] = 1
  expect(arr[1][1]).toBeTruthy()
})

test('Test NaN', () => {
  expect(isNaN()).toBeTruthy()
  expect(isNaN(NaN)).toBeTruthy()
  expect(isNaN(9)).toBeFalsy()
})

test('Test sort', () => {
  const input = [31415926535897932384626433832795, 1, 3, 10, 3, 5]
  const expected = [1, 3, 3, 5, 10, 31415926535897932384626433832795]
  expect(bigSorting(input)).toEqual(expected)
})

function bigSorting (arr) {
  return arr.sort((a, b) => +b <= +a)
}
