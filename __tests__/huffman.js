// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)
function frequencies(s) {
  let array = s.split('').sort()

  let prev = ''
  let obj = {code: '', frequency: 0}
  let result = []
  array.forEach(v => {
    if (v == prev) {
      obj.frequency += 1
    } else {
      result.push(JSON.parse(JSON.stringify(obj)))
      obj.code = v
      obj.frequency = 1
    }
    prev = v
  })
  result.push(JSON.parse(JSON.stringify(obj)))
  result.shift()
  result.sort((v1, v2) => v1.frequency - v2.frequency)
  result = result.map(x => [x.code, x.frequency]).sort()
  return result
}

// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs, s) {
  return huffman(s)
}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs, bits) {}

test('frequencies', () => {
  expect(frequencies('aaaabcc')).toEqual([['a', 4], ['b', 1], ['c', 2]])
})
test('encode', () => {
  // expect(encode(frequencies('aaaabcc'), 'aaaabcc').length).toEqual(10)
})
let frequency = str => {
  let array = str.split('').sort()

  let prev = ''
  let obj = {code: '', frequency: 0}
  let result = []
  array.forEach(v => {
    if (v == prev) {
      obj.frequency += 1
    } else {
      result.push(JSON.parse(JSON.stringify(obj)))
      obj.code = v
      obj.frequency = 1
    }
    prev = v
  })
  result.push(JSON.parse(JSON.stringify(obj)))
  result.shift()
  result.sort((v1, v2) => v1.frequency - v2.frequency)
  return result
}

function generateTree(str) {
  let frequencyArray = frequency(str)
  while (1) {
    let tree, newTree
    let left = Object.assign(
      {
        left: null,
        right: null,
      },
      frequencyArray[0]
    )
    let right = Object.assign(
      {
        left: null,
        right: null,
      },
      frequencyArray[1]
    )
    tree = {
      left: left,
      right: right,
      code: '',
      frequency: left.frequency + right.frequency,
    }
    frequencyArray.shift()
    frequencyArray.shift()
    frequencyArray.push(tree)
    if (frequencyArray.length == 1) {
      break
    }

    frequencyArray.sort((v1, v2) => v1.frequency - v2.frequency)
  }
  return frequencyArray.shift()
}

let codeQueue = []
function showHuffmanCode(tree) {
  if (tree != null) {
    if (tree.left == null && tree.right == null) {
      process.stdout.write(`code ${tree.code}: `)
      for (let i = 0; i < codeQueue.length; i++) {
        process.stdout.write(`${String(codeQueue[i])}`)
      }
      process.stdout.write(`\n`)
    } else {
      codeQueue.push(0)
      showHuffmanCode(tree.left)
      codeQueue[codeQueue.length - 1] = 1
      showHuffmanCode(tree.right)
    }
  }
}
let dic = {}
function getHuffmanCode(tree) {
  let huffmanCode = ''
  if (tree != null) {
    if (tree.left == null && tree.right == null) {
      for (let i = 0; i < codeQueue.length; i++) {
        huffmanCode += String(codeQueue[i])
      }
      dic[tree.code] = huffmanCode
    } else {
      codeQueue.push(0)
      getHuffmanCode(tree.left)
      codeQueue[codeQueue.length - 1] = 1
      getHuffmanCode(tree.right)
    }
  }
  return dic
}

function huffman(str) {
  let tree = generateTree(str)
  // showHuffmanCode(tree);
  let huffmanDic = getHuffmanCode(tree)
  return str
    .split('')
    .map(v => huffmanDic[v])
    .join('')
}
