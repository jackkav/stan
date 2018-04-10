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
  let notation = {}
  const molecules = formula.match(/[A-Z][a-z]?\d*|(?<!\([^)]*)\(.*\)\d+(?![^(]*\))/g)
  // console.log(molecules)
  molecules.forEach(x => {
    t = {}
    const hasBrackets = x[0] === '[' || x[0] === '('
    const number = x.match(/\d/g)
    const letters = x.replace(x.match(/\d/g), '')
    if (!hasBrackets) t[letters] = +number || 1
    else
      x.slice(1, -2).split``.forEach(y => {
        t[y] = +x[x.length - 1]
      })

    notation = {...notation, ...t}
  })
  return notation
}

test('duplicateCount', () => {
  expect(duplicateCount('acbde')).toEqual(0)
  expect(duplicateCount('aabbcde')).toEqual(2)
  expect(duplicateCount('Indivisibility')).toEqual(1)
})
const duplicateCount = text => {
  return (text.toLowerCase().split``.sort().join``.match(/([^])\1+/g) || []).length
}
test('nextBigger', () => {
  expect(nextBigger(12)).toEqual(21)
  expect(nextBigger(144)).toEqual(414)
  expect(nextBigger(513)).toEqual(531)
  expect(nextBigger(88775444432220)).toEqual(-1)
  expect(nextBigger(1234567890)).toEqual(1234567908)
  expect(nextBigger(38396610)).toEqual(38601369)
  expect(nextBigger(8)).toEqual(-1)
  expect(nextBigger(68985)).toEqual(69588)
  expect(nextBigger(7672016442)).toEqual(7672021446)
})
const sorted = n => [...(n + '')].sort((a, b) => b - a)

function nextBigger(n) {
  let arr = sorted(n)
  for (var i = n + 1; i <= +arr.join``; i++) {
    if (sorted(i).every((x, j) => x === arr[j])) return i
  }
  return -1
}

// function permut(string) {
//   if (string.length < 2) return string
//   var permutations = []
//   for (var i = 0; i < string.length; i++) {
//     var char = string[i]
//     if (string.indexOf(char) != i) continue
//     var remainingString = string.slice(0, i) + string.slice(i + 1, string.length) //Note: you can concat Strings via '+' in JS
//     for (var s of permut(remainingString)) permutations.push(char + s)
//   }
//   return permutations
// }

// Depth first search
const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const array2 = [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
test('snail', () => {
  expect(snail(array)).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5])
  expect(snail(array2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
})
const snail = array => {
  return [...array[0], ...getCol(array, 2).slice(1), ...array[2].slice(0, -1).reverse(), ...array[1].slice(0, -1)]
}
function getCol(matrix, col) {
  var column = []
  for (var i = 0; i < matrix.length; i++) {
    column.push(matrix[i][col])
  }
  return column
}
test('isValidCoordinates', () => {
  ValidCoordinates.map(x => expect(isValidCoordinates(x)).toEqual(true))
  InvalidCoordinates.map(x => expect(isValidCoordinates(x)).toEqual(false))
})
var ValidCoordinates = ['-23, 25', '4, -3', '24.53525235, 23.45235', '04, -23.234235', '43.91343345, 143']
var InvalidCoordinates = [
  '23.234, - 23.4234',
  '2342.43536, 34.324236',
  'N23.43345, E32.6457',
  '99.234, 12.324',
  '6.325624, 43.34345.345',
  '0, 1,2',
  '0.342q0832, 1.2324',
  '23.245, 1e1',
]
function isValidCoordinates(coordinates) {
  if (coordinates.match(/[a-z]/g)) return false
  c = coordinates.split`, `
  if (c.filter(x => x.includes(' ')).length) return false
  const lat = +c[0]
  const long = +c[1]
  if (isNaN(lat) || lat < -90 || lat > 90) return false
  if (isNaN(long) || long < -180 || long > 180) return false
  return true
}

test('isValidIP', () => {
  expect(isValidIP('1.2.3.4')).toEqual(true)
  expect(isValidIP('0.0.0.0')).toEqual(true)
  expect(isValidIP('123.45.67.89')).toEqual(true)
  expect(isValidIP('123.045.67.89')).toEqual(false)
  expect(isValidIP('abc.def.ghi.jkl')).toEqual(false)
})
function isValidIP(str) {
  if (str.match(/[a-z]/g)) return false
  x = str.split`.`
  if (x.length !== 4) return false
  if (x.filter(x => +x > 255 || String(+x).length !== x.length).length) return false
  return true
}
test('Base64', () => {
  expect(toBase64('this is a string!!')).toEqual('dGhpcyBpcyBhIHN0cmluZyEh')
  expect(fromBase64('dGhpcyBpcyBhIHN0cmluZyEh')).toEqual('this is a string!!')
})

const toBase64 = a => new Buffer(a).toString('base64')
const fromBase64 = a => new Buffer(a, 'base64').toString()

test('sumStrings', () => {
  expect(sumStrings('712569312664357328695151392', '8100824045303269669937')).toEqual('712577413488402631964821329')
})

function sumStrings(a, b) {
  var A = a.split``,
    B = b.split``,
    C = 0,
    R = ''
  // while above have value
  while (A.length || B.length || C) {
    //add last numbers together
    C = C + (~~A.pop() + ~~B.pop())
    R = C % 10 + R
    C = C > 9
  }

  return R.replace(/^0+/, '')
}
test('getMissingIngredients', () => {
  expect(getMissingIngredients(recipe, {})).toEqual({flour: 200, eggs: 1, sugar: 100})
  expect(getMissingIngredients(recipe, {eggs: 1})).toEqual({flour: 200, sugar: 100})
  expect(getMissingIngredients(recipe, {eggs: 1, sugar: 50})).toEqual({flour: 200, sugar: 50})
  expect(getMissingIngredients(recipe, {flour: 200, sugar: 100})).toEqual({eggs: 1})
  expect(getMissingIngredients(recipe, {flour: 200, sugar: 100, eggs: 1})).toEqual({})
  expect(getMissingIngredients(recipe, {flour: 400, eggs: 2, sugar: 200})).toEqual({})
  expect(getMissingIngredients(recipe, {flour: 1000, eggs: 5, sugar: 500})).toEqual({})
  expect(getMissingIngredients(recipe, {flour: 500, sugar: 200})).toEqual({eggs: 3, flour: 100, sugar: 100})
})
const recipe = {flour: 200, eggs: 1, sugar: 100}
const cakes = (needs, has) => Math.max(...Object.keys(needs).map(key => Math.round(has[key] / needs[key] || 1)))
function getMissingIngredients(recipe, added) {
  let r = {}
  let nr = {...recipe}
  let totalCakes = cakes(recipe, added)
  Object.keys(recipe).forEach(x => {
    nr[x] = nr[x] * totalCakes
    if (added[x] < nr[x]) r[x] = nr[x] - added[x]
    else if (added[x] !== nr[x]) r[x] = nr[x]
  })
  return r
}
test.only('findUniq', () => {
  // expect(findUniq([2, 2, 2, 1, 2, 2, 2])).toEqual(1)

  expect(
    findTwoUnique([
      8,
      45,
      41,
      35,
      44,
      27,
      19,
      17,
      48,
      3,
      5,
      13,
      15,
      31,
      22,
      28,
      24,
      6,
      49,
      36,
      38,
      1,
      40,
      42,
      16,
      37,
      30,
      25,
      47,
      33,
      18,
      29,
      23,
      21,
      34,
      9,
      32,
      39,
      46,
      7,
      50,
      4,
      12,
      43,
      11,
      14,
      10,
      20,
      26,
      39,
      20,
      41,
      49,
      46,
      43,
      14,
      9,
      28,
      16,
      21,
      47,
      36,
      27,
      37,
      38,
      15,
      3,
      42,
      1,
      40,
      4,
      29,
      11,
      32,
      25,
      31,
      2,
      19,
      24,
      17,
      8,
      6,
      33,
      30,
      26,
      5,
      23,
      50,
      48,
      45,
      7,
      18,
      10,
      12,
      35,
      22,
      44,
      13,
    ])
  ).toEqual([2, 34])
  expect(findTwoUnique([1, 2, 4, 3, 5, 4, 2, 1])).toEqual([3, 5])
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
function findTwoUnique(arr) {
  let [a, b] = unique(arr).sort()
  let c = []
  if (a < b) {
    c[0] = a
    c[1] = b
  } else {
    c.push(b)
    c.push(a)
  }
  return c
}
function findUniq2(arr) {
  arr.sort((a, b) => a - b)
  return arr[0] === arr[1] ? arr.pop() : arr[0]
}

test('it detects palindromes', () => {
  expect(isPalindrome('palindrome')).toBe(false)
  expect(isPalindrome('')).toBe(true)
  expect(isPalindrome('a')).toBe(true)
  expect(isPalindrome('gg')).toBe(true)
  expect(isPalindrome('pop')).toBe(true)
  expect(isPalindrome('1212')).toBe(false)
})
function isPalindrome(s) {
  const count = s.length - 1
  if (count < 2) {
    return true
  }

  for (i = 0; i < (count + 1) / 2; ++i) {
    if (s[i] !== s[count - i]) return false
  }
  return true
}
