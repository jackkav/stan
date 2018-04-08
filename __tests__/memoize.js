test('fib fast', () => {
  expect(fibonacci(70)).toEqual(190392490709135)
  expect(fibonacci(60)).toEqual(1548008755920)
  expect(fibonacci(40)).toEqual(102334155)
  expect(fibonacci(10)).toEqual(55)
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
// const sumAllEvenFibonacciNumbers = n =>
//   Array(n)
//     .fill()
//     .map((x, i) => i)
//     .map(fibonacci)
//     .filter(x => !(x % 2))
// // .map(console.log)
// // .reduce((acc, x) => x + acc, 0)
