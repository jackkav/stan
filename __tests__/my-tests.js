test('sort numbers and that', () => {
  const input = [31415926535897932384626433832795, 0.1, 3, 10, 3, 5]
  const expected = [0.1, 3, 3, 5, 10, 31415926535897932384626433832795]
  expect(bigSorting(input)).toEqual(expected)
})

function bigSorting(arr) {
  return arr.sort((a, b) => a - b)
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

test('minMax sum of 4 numbers', () => {
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

const readableList = c => (c.length === 1 ? c[0] : `${c.slice(0, -1).join`, `} and ${c[c.length - 1]}`)

test('matrices', () => {
  expect(rotateMatrix(matrix)).toEqual(expectedMatrix)
})
const matrix = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
const expectedMatrix = [[1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4]]
const rotateMatrix = a => a.map((x, i) => a.map(y => y[i]))
const goodSudoku = [[1, 4, 2, 3], [3, 2, 4, 1], [4, 1, 3, 2], [2, 3, 1, 4]]
const badSudoku = [[1, 4, 2, 3], [3, 2, 4, 1], [4, 1, 2, 3], [2, 3, 1, 4]]

test('sudoku', () => {
  expect(isValidSudoku([[1, 2], [2, 1]])).toEqual(true)
  expect(isValidSudoku([[1, 2], [1, 2]])).toEqual(false)
  expect(isValidSudoku([[1, 2, 3], [3, 1, 2], [3, 1, 2]])).toEqual(false)
  expect(isValidSudoku(matrix)).toEqual(false)
  expect(isValidSudoku(goodSudoku)).toEqual(true)
  expect(isValidSudoku(badSudoku)).toEqual(false)
})

const isValidSudoku = data => {
  const shouldBe = Array(data.length)
    .fill()
    .map((x, i) => i + 1).join``
  const validRow = r => !r.filter(x => typeof x !== 'number').length && r.sort((a, b) => a - b).join`` === shouldBe
  const r = rotateMatrix(data)
  return Array(data.length)
    .fill()
    .map((x, i) => validRow(data[i]) && validRow(r[i]))
    .reduce((acc, x) => (!x ? (acc = false) : acc))
}
test('molecules', () => {
  expect(parseMolecule('H2O')).toEqual({H: 2, O: 1})
  expect(parseMolecule('Mg(OH)2')).toEqual({Mg: 1, O: 2, H: 2})
  // expect(parseMolecule('Fe(NO3)2')).toEqual({Fe: 2, N: 2, O: 6})
  // expect(parseMolecule('K4[ON(SO3)2]2')).toEqual({K: 4, O: 14, N: 2, S: 4})
})

function parseMolecule(formula) {
  const notation = {}
  const molecules = formula.match(/[A-Z][a-z]?\d*|(?<!\([^)]*)\(.*\)\d+(?![^(]*\))/g)
  molecules.forEach(x => {
    if (x.includes('(')) {
      x.slice(1, -2).split``.forEach(y => {
        notation[y] = +x[x.length - 1]
      })
    } else notation[x.replace(x.match(/\d/g), '')] = +x.match(/\d/g) || 1
  })
  return notation
}
