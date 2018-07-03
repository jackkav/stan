var input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var output1, output2

function isEven(x) {
  return x % 2 === 0
}

function isBiggerThan(x, y) {
  return y > x
}

function plus(x) {
  return function(y) {
    return y + x
  }
}

function not(x) {
  return function() {
    return !x()
  }
}

function toChar(x) {
  return String.fromCharCode(97 + x)
}

function isVowel(x) {
  return x === 'a' || x === 'e' || x === 'i' || x === 'o' || x === 'u' || x === 'y'
}

function cisBiggerThan(x) {
  return function(y) {
    return y > x
  }
}

test('speed', () => {
  // console.time('s')
  for (let z = 10000; z--; ) {
    output1 = input
      .filter(int => isEven(int))
      .filter(int => isBiggerThan(3, int))
      .map(int => int + 1)
      .map(int => toChar(int))
      .filter(char => !isVowel(char))
      .join('')
  }
  // console.timeEnd('s')
  // console.time('t')
  for (let z = 10000; z--; ) {
    output2 = ''
    for (let ct = 0; ct < input.length; ct++) {
      var cd = input[ct]
      if (cd % 2 === 0 && cd > 3) {
        var c = String.fromCharCode(97 + cd + 1)
        if (!(c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u' || c === 'y')) {
          output2 = output2 + c
        }
      }
    }
  }
  // console.timeEnd('t')
})
