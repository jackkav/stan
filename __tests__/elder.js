test('elderAge', () => {
  // console.time('b')
  // expect(elderAge(8, 5, 1, 100)).toEqual(5)
  // expect(elderAge(545, 435, 342, 1000007)).toEqual(808451)
  // expect(elderAge2(545, 435, 342, 1000007)).toEqual(808451)
  // expect(elderAge3r(545, 435, 342, 1000007)).toEqual(808451)
  // expect(elderAge3(545, 435, 342, 1000007)).toEqual(808451)
  // expect(elderAge4(545, 435, 342, 1000007)).toEqual(808451)
  // expect(elderAge5(545, 435, 342, 1000007)).toEqual(808451)
  // expect(elderAge(25, 31, 0, 100007)).toEqual(11925)
  // console.timeEnd('b')
  // expect(elderAge(28827050410, 35165045587, 7109602, 13719506)).toEqual(5456283)
})
function elderAge(m, n, l, t) {
  console.time('string' + m)
  let s = ''
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) s += `${Math.max(0, (i ^ j) - l)},`

  const total = s.split`,`.reduce((acc, x) => +x + acc, 0)
  const r = total % t
  console.timeEnd('string' + m)
  return r
}
function elderAge3(m, n, l, t) {
  console.time('increment' + m)
  let total = 0
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) total += Math.max(0, (i ^ j) - l)
  const r = total % t
  console.timeEnd('increment' + m)
  return r
}
function elderAge3r(m, n, l, t) {
  console.time('incrementreverse' + m)
  let total = 0
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) total += Math.max(0, (i ^ j) - l)
  }
  const r = total % t
  console.timeEnd('incrementreverse' + m)
  return r
}
function elderAge4(m, n, l, t) {
  console.time('forfor' + m)
  let total = 0
  let x = m * n
  for (let i = 0; i < x; i++) total += Math.max(0, ((0 | (i / n)) ^ (i % n)) - l)
  const r = total % t
  console.timeEnd('forfor' + m)
  return r
}

function elderAge5(m, n, l, t) {
  console.time('forreverse' + m)
  let total = 0
  let i = m * n - 1
  for (; i > 0; i--) total += Math.max(0, ((0 | (i / n)) ^ (i % n)) - l)
  const r = total % t
  console.timeEnd('forreverse' + m)
  return r
}
function elderAge2(m, n, l, t) {
  console.time('array' + m)
  let s = ''
  const grid = Array(n)
    .fill()
    .map((x, i) =>
      Array(m)
        .fill(0)
        .map((y, j) => (s += `${Math.max(0, (i ^ j) - l)},`) && Math.max(0, (i ^ j) - l))
    )
  const total = grid.join`,`.split`,`.reduce((acc, x) => +x + acc, 0)
  const r = total % t
  console.timeEnd('array' + m)
  return r
}
