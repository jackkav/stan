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

  // all but last
  const allBut = a.slice(0, -1)
  expect(allBut).toEqual([1, 2, 3, 4, 5])
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
