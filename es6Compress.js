const compressUTF16 = input => _compress(input, 15, a => f(a + 32)) + ' '

const f = String.fromCharCode
const _compress = (uncompressed, bitsPerChar, getCharFromInt) => {
  if (uncompressed === null) return ''

  let a, marker
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
  let EightBit = 8
  let SixteenBit = 16

  // 1. Initialize the dictionary to contain all strings of length one.
  // 2. Find the longest string W in the dictionary that matches the current input.
  // 3. Emit the dictionary index for W to output and remove W from the input.
  // 4. Add W followed by the next symbol in the input to the dictionary.
  // 5. Go to Step 2.
  const reset = value => {
    data.push(getCharFromInt(value))
    position = 0
    value = 0
  }
  const doTheThing = () => {
    value = mergeBits(shiftBitRight(value), isOdd(marker))
    if (position === bitsPerChar - 1) reset(value)
    else position++
    marker = shiftBitLeft(marker)
  }
  const doTheOtherThing = v => {
    value = v
    if (position === bitsPerChar - 1) reset(value)
    else position++
  }
  const engourge = () => {
    enlargeIn--
    if (enlargeIn === 0) {
      enlargeIn = Math.pow(2, numBits)
      numBits++
    }
  }

  const eachCharacter = [...uncompressed]
  eachCharacter.forEach(c => {
    if (!has(dictionary, c)) {
      dictionary[c] = dictSize++
      dictionaryToCreate[c] = true
    }
    wc = w + c
    if (has(dictionary, wc)) {
      w = wc
      return
    }
    if (has(dictionaryToCreate, w)) {
      if (is8Bit(w)) {
        Array(numBits)
          .fill()
          .forEach(() => doTheOtherThing(shiftBitRight(value)))
        a = w.charCodeAt(0)
        for (let i = 0; i < EightBit; i++) {
          value = mergeBits(shiftBitRight(value), isOdd(a))
          if (position !== bitsPerChar - 1) position++
          else {
            data.push(getCharFromInt(value))
            position = 0
            value = 0
          }
          a = shiftBitLeft(a)
        }
      }
      // else {
      //   a = 1

      //   for (let i = 0; i < numBits; i++) {
      //     doTheOtherThing(mergeBits(shiftBitRight(value), a))
      //     a = 0
      //   }
      //   a = w.charCodeAt(0)
      //   for (let i = 0; i < SixteenBit; i++) {
      //     doTheOtherThing(mergeBits(shiftBitRight(value), isOdd(a)))
      //     a = shiftBitLeft(a)
      //   }
      // }
      enlargeIn--
      if (enlargeIn === 0) {
        enlargeIn = Math.pow(2, numBits)
        numBits++
      }
      delete dictionaryToCreate[w]
    } else {
      a = dictionary[w]
      for (let i = 0; i < numBits; i++) {
        value = mergeBits(shiftBitRight(value), isOdd(a))
        if (position !== bitsPerChar - 1) position++
        else {
          data.push(getCharFromInt(value))
          position = 0
          value = 0
        }
        a = shiftBitLeft(a)
      }
    }
    enlargeIn--
    if (enlargeIn === 0) {
      enlargeIn = Math.pow(2, numBits)
      numBits++
    }
    // Add wc to the dictionary.
    dictionary[wc] = dictSize++
    w = c
  })

  // Output the code for w.
  if (w) {
    if (has(dictionaryToCreate, w)) {
      if (is8Bit(w)) {
        Array(numBits)
          .fill()
          .forEach(() => doTheOtherThing(shiftBitRight(value)))

        a = w.charCodeAt(0)
        for (let i = 0; i < EightBit; i++) {
          value = mergeBits(shiftBitRight(value), isOdd(a))
          if (position === bitsPerChar - 1) reset(value)
          else position++
          a = shiftBitLeft(a)
        }
      }
      // else {
      //   a = 1
      //   for (let i = 0; i < numBits; i++) {
      //     doTheOtherThing(mergeBits(shiftBitRight(value), a))
      //     marker = 0
      //   }
      //   marker = w.charCodeAt(0)
      //   for (let i = 0; i < SixteenBits; i++) {
      //     doTheThing()
      //   }
      // }
      engourge()
      delete dictionaryToCreate[w]
    } else {
      marker = dictionary[w]
      Array(numBits)
        .fill()
        .forEach(() => doTheThing())
    }
    engourge()
  }

  // Mark the end of the stream
  marker = 2
  Array(numBits)
    .fill()
    .forEach(() => doTheThing())

  // Flush the last char
  while (true) {
    value = shiftBitRight(value)
    if (position !== bitsPerChar - 1) position++
    else {
      data.push(getCharFromInt(value))
      break
    }
  }
  return data.join``
}
const has = (x, y) => Object.prototype.hasOwnProperty.call(x, y)
const isOdd = n => n & 1
const shiftBitRight = n => n << 1
const shiftBitLeft = n => n >> 1
const mergeBits = (n, m) => n | m
const is8Bit = c => c.charCodeAt(0) < 256
module.exports.compressUTF16 = compressUTF16
