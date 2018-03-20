const compress = input => _compress(input, 15, a => f(a + 32)) + ' '
const f = String.fromCharCode
const _compress = (uncompressed, bitsPerChar, getCharFromInt) => {
  if (uncompressed === null) return ''

  let a
  let marker
  let dictionary = {}
  let dictionaryToCreate = {}

  let wc = ''
  let w = ''
  let enlargeIn = 2 // Compensate for the first entry which should not count
  let dictSize = 3
  let numBits = 2
  let data = []
  let value = 0
  let position = 0

  // 1. Initialize the dictionary to contain all strings of length one.
  // 2. Find the longest string W in the dictionary that matches the current input.
  // 3. Emit the dictionary index for W to output and remove W from the input.
  // 4. Add W followed by the next symbol in the input to the dictionary.
  // 5. Go to Step 2.

  const eachCharacter = [...uncompressed]
  eachCharacter.forEach(c => {
    if (!has(dictionary, c)) {
      dictionary[c] = dictSize++
      dictionaryToCreate[c] = true
    }
    wc = w + c
    if (has(dictionary, wc)) {
      w = wc
    } else {
      if (has(dictionaryToCreate, w)) {
        if (w.charCodeAt(0) < 256) {
          for (let i = 0; i < numBits; i++) {
            value = value << 1
            if (position === bitsPerChar - 1) {
              position = 0
              data.push(getCharFromInt(value))
              value = 0
            } else {
              position++
            }
          }
          a = w.charCodeAt(0)
          for (let i = 0; i < 8; i++) {
            value = (value << 1) | isOdd(a)
            if (position === bitsPerChar - 1) {
              position = 0
              data.push(getCharFromInt(value))
              value = 0
            } else {
              position++
            }
            a = a >> 1
          }
        } else {
          a = 1
          for (let i = 0; i < numBits; i++) {
            value = (value << 1) | a
            if (position === bitsPerChar - 1) {
              position = 0
              data.push(getCharFromInt(value))
              value = 0
            } else {
              position++
            }
            a = 0
          }
          a = w.charCodeAt(0)
          for (let i = 0; i < 16; i++) {
            value = (value << 1) | isOdd(a)
            if (position === bitsPerChar - 1) {
              position = 0
              data.push(getCharFromInt(value))
              value = 0
            } else {
              position++
            }
            a = a >> 1
          }
        }
        enlargeIn--
        if (enlargeIn === 0) {
          enlargeIn = Math.pow(2, numBits)
          numBits++
        }
        delete dictionaryToCreate[w]
      } else {
        a = dictionary[w]
        for (let i = 0; i < numBits; i++) {
          value = (value << 1) | isOdd(a)
          if (position === bitsPerChar - 1) {
            position = 0
            data.push(getCharFromInt(value))
            value = 0
          } else {
            position++
          }
          a = a >> 1
        }
      }
      enlargeIn--
      if (enlargeIn === 0) {
        enlargeIn = Math.pow(2, numBits)
        numBits++
      }
      // Add wc to the dictionary.
      dictionary[wc] = dictSize++
      w = String(c)
    }
  })

  // Output the code for w.
  if (w) {
    if (has(dictionaryToCreate, w)) {
      if (w.charCodeAt(0) < 256) {
        for (let i = 0; i < numBits; i++) {
          value = value << 1
          if (position === bitsPerChar - 1) {
            position = 0
            data.push(getCharFromInt(value))
            value = 0
          } else {
            position++
          }
        }
        a = w.charCodeAt(0)
        for (let i = 0; i < 8; i++) {
          value = (value << 1) | isOdd(a)
          if (position === bitsPerChar - 1) {
            position = 0
            data.push(getCharFromInt(value))
            value = 0
          } else {
            position++
          }
          a = a >> 1
        }
      } else {
        a = 1
        for (let i = 0; i < numBits; i++) {
          value = (value << 1) | a
          if (position === bitsPerChar - 1) {
            position = 0
            data.push(getCharFromInt(value))
            value = 0
          } else {
            position++
          }
          marker = 0
        }
        marker = w.charCodeAt(0)
        for (let i = 0; i < 16; i++) {
          value = (value << 1) | (marker & 1)
          if (position === bitsPerChar - 1) {
            position = 0
            data.push(getCharFromInt(value))
            value = 0
          } else {
            position++
          }
          marker = marker >> 1
        }
      }
      enlargeIn--
      if (enlargeIn === 0) {
        enlargeIn = Math.pow(2, numBits)
        numBits++
      }
      delete dictionaryToCreate[w]
    } else {
      marker = dictionary[w]
      for (let i = 0; i < numBits; i++) {
        value = (value << 1) | (marker & 1)
        if (position === bitsPerChar - 1) {
          position = 0
          data.push(getCharFromInt(value))
          value = 0
        } else {
          position++
        }
        marker = marker >> 1
      }
    }
    enlargeIn--
    if (enlargeIn === 0) {
      enlargeIn = Math.pow(2, numBits)
      numBits++
    }
  }

  // Mark the end of the stream
  marker = 2
  for (let i = 0; i < numBits; i++) {
    value = (value << 1) | (marker & 1)
    if (position === bitsPerChar - 1) {
      position = 0
      data.push(getCharFromInt(value))
      value = 0
    } else {
      position++
    }
    marker = marker >> 1
  }

  // Flush the last char
  while (true) {
    value = value << 1
    if (position === bitsPerChar - 1) {
      data.push(getCharFromInt(value))
      break
    } else position++
  }
  return data.join``
}
const has = (x, y) => Object.prototype.hasOwnProperty.call(x, y)
const isOdd = n => n & 1
module.exports.compress = compress
