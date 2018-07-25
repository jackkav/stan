const cellsAsNumber = a => {
  // 1. initialize state
  // 2. for n get next row and append to state
  // 3. convert state to blocks
  // 4. padding?
  let r = ''
  let c = cellsAsArray(a)
  for (let i = 1; i <= a; i++) {
    if (i !== 1) r += '\n'
    let next = c[i - 1].join``
    if (a > 3) next = '0'.repeat(a - next.length) + next
    r += next
  }
  return r
}
test('cell as number', () => {
  expect(cellsAsNumber(1)).toEqual(`001`)
  expect(cellsAsNumber(2)).toEqual(`001
011`)
  expect(cellsAsNumber(3)).toEqual(`001
011
111`)
  expect(cellsAsNumber(4)).toEqual(`0001
0011
0111
1101`)
})
const cellsAsArray = n => {
  const init = [0, 0, 1]
  let r = [init]
  for (let i = 1; i < n; i++) {
    r.push(nextRow(r))
  }
  return r
}
// ar=n=>{
//   w=[[0,0,1]]
//   for(j=n;j--;)w.push(o(w))
//   return w}
test('cells as array', () => {
  expect(cellsAsArray(1)).toEqual([[0, 0, 1]])
  expect(cellsAsArray(2)).toEqual([[0, 0, 1], [0, 1, 1]])
})
const toBlocks = b => {
  return b.map(x => (x ? '█' : ' ')).join``
}
test('nextRow from previous', () => {
  expect(toBlocks([0, 0, 1])).toEqual(`  █`)
  expect(toBlocks([0, 0, 1, 0, 1])).toEqual(`  █ █`)
})
const nextRow = r => {
  // console.log(getNeighbours(r))
  return getNeighbours(r).map(newStateFromNeighbours)
}

test('nextRow from previous', () => {
  expect(nextRow([[0, 0, 1]])).toEqual([0, 1, 1])
  expect(nextRow([[0, 0, 1]])).toEqual([0, 1, 1])
  expect(nextRow([[0, 0, 1], [0, 1, 1]])).toEqual([1, 1, 1])
  expect(nextRow([[0, 0, 1], [0, 1, 1], [1, 1, 1]])).toEqual([1, 1, 0, 1])
})

const getNeighbours = a => {
  const x = a[a.length - 1]
  // console.log(x)
  const r = x.map((x, y, z) => [z[y - 1] | 0, z[y], z[y + 1] | 0])
  a.length > 2 && r.unshift([0, 0, 1])
  return r
}

test('who is my neighbour', () => {
  expect(getNeighbours([[0, 0, 1], [0, 1, 1]])).toEqual([[0, 0, 1], [0, 1, 1], [1, 1, 0]])
  expect(getNeighbours([[0, 0, 1], [0, 1, 1], [1, 1, 1], [1, 1, 0, 1]])).toEqual([
    [0, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ])
})

const newStateFromNeighbours = n => {
  const b = +('0b' + n.join``)
  return +(b && b !== 4 && b !== 7)
}
// o=r=>u(r).map(n=>+(b=+('0b'+n.join``),b&&b!=4&&b!=7))
test('new state from neighbour', () => {
  expect(newStateFromNeighbours([1, 1, 1])).toEqual(0)
  expect(newStateFromNeighbours([0, 0, 0])).toEqual(0)
  expect(newStateFromNeighbours([1, 0, 0])).toEqual(0)
  expect(newStateFromNeighbours([0, 1, 0])).toEqual(1)
  expect(newStateFromNeighbours([1, 0])).toEqual(1)
  expect(newStateFromNeighbours([1])).toEqual(1)
  expect(newStateFromNeighbours([0, 0, 1])).toEqual(1)
})
