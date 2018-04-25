test('fib fast', () => {
  // expect(fibonacci(70)).toEqual(190392490709135)
  // expect(fibonacci(60)).toEqual(1548008755920)
  // expect(fibonacci(40)).toEqual(102334155)
  // expect(fibonacci(10)).toEqual(55)
  // expect(f(70)).toEqual(190392490709135)
  // expect(f(60)).toEqual(1548008755920)
  expect(f(40)).toEqual(102334155)
  expect(f(20)).toEqual(6765)
  expect(f(10)).toEqual(55)
  expect(f(0)).toEqual(0)
  expect(f(1)).toEqual(1)
  expect(f(2)).toEqual(1)
  // expect(sumAllEvenFibonacciNumbers(10)).toEqual(44)
  // expect(sumAllEvenFibonacciNumbers(1000)).toEqual(798)
})
const memoize = passedFunc => {
  var cache = {}
  return x => {
    if (x in cache) return cache[x]
    return (cache[x] = passedFunc(x))
  }
}
const fibonacci = memoize(n => {
  if (n == 0 || n == 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
})
const f = n => +(n ? n < 3 || f(n - 1) + f(n - 2) : 0)
// const sumAllEvenFibonacciNumbers = n =>
//   Array(n)
//     .fill()
//     .map((x, i) => i)
//     .map(fibonacci)
//     .filter(x => !(x % 2))
// // .map(console.log)
// // .reduce((acc, x) => x + acc, 0)
