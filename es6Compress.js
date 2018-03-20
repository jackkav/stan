const compress = input => _compress(input, 15, a => f(a + 32)) + ' '
const f = String.fromCharCode
const _compress = (uncompressed, bitsPerChar, getCharFromInt) => {
  if (uncompressed === null) return ''

  let counter, marker
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

  const reset = value => {
    data.push(getCharFromInt(value))
    position = 0
    value = 0
  }
  const doTheThingAndShiftMarker = () => {
    doTheMainThing(mergeBits(shiftBitRight(value), isOdd(marker)))
    marker = shiftBitLeft(marker)
  }
  const doTheThingAndShiftCounter = () => {
    doTheMainThing(mergeBits(shiftBitRight(value), isOdd(counter)))
    counter = shiftBitLeft(counter)
  }
  const doTheThingAndResetCounter = () => {
    doTheMainThing(mergeBits(shiftBitRight(value), counter))
    counter = 0
  }
  const doTheThingAndResetMarker = () => {
    doTheMainThing(mergeBits(shiftBitRight(value), isOdd(marker)))
    marker = 0
  }
  const doTheStrangerThing = () => {
    value = mergeBits(shiftBitRight(value), isOdd(counter))
    if (position === bitsPerChar - 1) {
      data.push(getCharFromInt(value))
      position = 0
      value = 0
    } else {
      position++
    }
    counter = shiftBitLeft(counter)
  }
  const doTheStrangerThingAgain = () => {
    value = mergeBits(shiftBitRight(value), isOdd(counter))
    if (position === bitsPerChar - 1) {
      position = 0
      data.push(getCharFromInt(value))
      value = 0
    } else {
      position++
    }
    counter = shiftBitLeft(counter)
  }
  const doTheMainThing = v => {
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
  const is8Bit = c => c.charCodeAt(0) < 256

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
        if (is8Bit(w)) {
          Array(numBits)
            .fill()
            .forEach(() => doTheMainThing(shiftBitRight(value)))

          counter = w.charCodeAt(0)
          Array(8)
            .fill()
            .forEach(() => doTheStrangerThing())
        } else {
          counter = 1
          Array(numBits)
            .fill()
            .forEach(() => doTheThingAndResetCounter())

          counter = w.charCodeAt(0)

          Array(16)
            .fill()
            .forEach(() => doTheStrangerThingAgain())
        }
        engourge()
        delete dictionaryToCreate[w]
      } else {
        counter = dictionary[w]
        for (let i = 0; i < numBits; i++) {
          value = mergeBits(shiftBitRight(value), isOdd(counter))
          if (position === bitsPerChar - 1) {
            position = 0
            data.push(getCharFromInt(value))
            value = 0
          } else {
            position++
          }
          counter = shiftBitLeft(counter)
        }
      }
      engourge()
      // Add wc to the dictionary.
      dictionary[wc] = dictSize++
      w = c
    }
  })

  // Output the code for w.
  if (w) {
    if (!has(dictionaryToCreate, w)) {
      marker = dictionary[w]
      Array(numBits)
        .fill()
        .forEach(() => doTheThingAndShiftMarker())
    } else {
      if (is8Bit(w)) {
        Array(numBits)
          .fill()
          .forEach(() => doTheMainThing(shiftBitRight(value)))
        counter = w.charCodeAt(0)
        Array(8)
          .fill()
          .forEach(() => doTheThingAndShiftCounter())
      } else {
        counter = 1
        Array(numBits)
          .fill()
          .forEach(() => doTheThingAndResetMarker())

        marker = w.charCodeAt(0)

        Array(16)
          .fill()
          .forEach(() => doTheThingAndShiftMarker())
      }
      engourge()
      delete dictionaryToCreate[w]
    }
    engourge()
  }

  // Mark the end of the stream
  marker = 2
  Array(numBits)
    .fill()
    .forEach(() => doTheThingAndShiftMarker())

  // Flush the last char
  while (true) {
    value = shiftBitRight(value)
    if (position === bitsPerChar - 1) {
      data.push(getCharFromInt(value))
      break
    } else position++
  }
  return data.join``
}
const has = (x, y) => Object.prototype.hasOwnProperty.call(x, y)
const isOdd = n => n & 1
const shiftBitRight = n => n << 1
const shiftBitLeft = n => n >> 1
const mergeBits = (n, m) => n | m
module.exports.compress = compress
