test.only('findUniq', () => {
  // expect(findUniq([2, 2, 2, 1, 2, 2, 2])).toEqual(1)
  let a = []
  Array(499998)
    .fill()
    .forEach(x => {
      let n = Math.random() * 100 + 40
      a.push(n)
      a.push(n)
    })
  a.push(2)
  a.push(34)
  // expect(unique2([1, 1, 1, 1, 1, 1, 2, 2, 2])).toEqual([1, 2])
  // expect(findTwoUnique(a)).toEqual([2, 34])
  // expect(findTwoUnique(a)).toEqual([2, 34])
  // expect(findTwoUnique2(a)).toEqual([2, 34])
  // expect(findTwoUnique2(a)).toEqual([2, 34])
  // expect(findTwoUnique([1, 2, 4, 3, 5, 4, 2, 1])).toEqual([3, 5])
})
function findUniqTwo(arr) {
  return [...new Set(arr)]
    .map(x => (arr.filter(y => y === x).length === 1 ? x : false))
    .filter(x => x)
    .sort((a, b) => a - b)
}
function unique(array) {
  let unique_array = []
  array.forEach(elem => {
    unique_array[elem] ? (unique_array[elem] = undefined) : (unique_array[elem] = elem)
  })
  return unique_array
}
function unique2(array) {
  let s = ''
  for (let i = 0; i < array.length; i++) {
    let r = array[i] + ','
    !s.includes(r) ? (s += r) : (s = s.replace(r, ''))
    console.log('s', s)
  }
  return s.split`,`
}
function findTwoUnique(arr) {
  console.time('a')
  let [a, b] = unique(arr).sort()
  let c = [a, b]
  if (a > b) {
    c = [b, a]
  }
  console.timeEnd('a')
  return c
}
function findTwoUnique2(arr) {
  console.time('c')
  console.log(unique2(arr))
  let [a, b] = unique2(arr).sort()

  let c = [a, b]
  if (a > b) {
    c = [b, a]
  }
  console.timeEnd('c')
  return c
}
function findUniq2(arr) {
  arr.sort((a, b) => a - b)
  return arr[0] === arr[1] ? arr.pop() : arr[0]
}
