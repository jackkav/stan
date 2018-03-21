const compress = input => _compress(input, 15, a => f(a + 32)) + ' '
const f = String.fromCharCode
const _compress = (uncompressed, bitsPerChar, getCharFromInt) => {
  if (uncompressed === null) return ''

  let counter, marker
  let dictionary = {}
  let dictionaryToCreate = {}

  let characterPair = ''
  let prevCharacter = ''
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

  const doTheThingAndShiftMarker = () => {
    updateAndPush(mergeBits(shiftBitRight(value), isOdd(marker)))
    marker = shiftBitLeft(marker)
  }
  const doTheThingAndShiftCounter = () => {
    updateAndPush(mergeBits(shiftBitRight(value), isOdd(counter)))
    counter = shiftBitLeft(counter)
  }
  const doTheThingAndResetCounter = () => {
    updateAndPush(mergeBits(shiftBitRight(value), counter))
    counter = 0
  }
  const doTheThingAndResetMarker = () => {
    updateAndPush(mergeBits(shiftBitRight(value), isOdd(marker)))
    marker = 0
  }
  const do8BitStuff = p => {
    Array(numBits)
      .fill()
      .forEach(() => updateAndPush(shiftBitRight(value)))
    counter = p.charCodeAt(0)
    Array(8)
      .fill()
      .forEach(() => doTheThingAndShiftCounter())
  }
  const updateAndPush = v => {
    value = v
    if (position === bitsPerChar - 1) {
      position = 0
      data.push(getCharFromInt(value))
      value = 0
    } else {
      position++
    }
  }
  const engourge = () => {
    enlargeIn--
    if (enlargeIn === 0) {
      enlargeIn = Math.pow(2, numBits)
      numBits++
    }
  }
  const setMarker = m => {
    marker = m
    Array(numBits)
      .fill()
      .forEach(() => doTheThingAndShiftMarker())
  }
  const setCounter = m => {
    counter = m
    Array(numBits)
      .fill()
      .forEach(() => doTheThingAndShiftCounter())
  }
  const flush = () => {
    while (true) {
      value = shiftBitRight(value)
      if (position === bitsPerChar - 1) {
        data.push(getCharFromInt(value))
        break
      } else position++
    }
  }

  const eachCharacter = [...uncompressed]
  eachCharacter.forEach(nextCharacter => {
    // when nextCharacter isnt in dictionary prepare two dictionary elements
    if (!has(dictionary, nextCharacter)) {
      dictionary[nextCharacter] = dictSize++
      dictionaryToCreate[nextCharacter] = true
    }

    characterPair = prevCharacter + nextCharacter
    if (has(dictionary, characterPair)) {
      prevCharacter = characterPair
      return
    }
    // when prevCharacter isnt in dictionaryToCreate set counter to dictionary element
    if (!has(dictionaryToCreate, prevCharacter)) setCounter(dictionary[prevCharacter])
    else {
      if (is8Bit(prevCharacter)) do8BitStuff(prevCharacter)
      else {
        counter = 1
        Array(numBits)
          .fill()
          .forEach(() => doTheThingAndResetCounter())
        counter = prevCharacter.charCodeAt(0)
        Array(16)
          .fill()
          .forEach(() => doTheThingAndShiftCounter())
      }
      engourge()
      delete dictionaryToCreate[prevCharacter]
    }
    engourge()
    // Add characterPair to the dictionary.
    dictionary[characterPair] = dictSize++
    prevCharacter = nextCharacter
  })

  // Output the code for prevCharacter.
  if (prevCharacter) {
    if (!has(dictionaryToCreate, prevCharacter)) {
      setMarker(dictionary[prevCharacter])
    } else {
      if (is8Bit(prevCharacter)) do8BitStuff(prevCharacter)
      else {
        // test not hitting here
        counter = 1
        Array(numBits)
          .fill()
          .forEach(() => doTheThingAndResetMarker())
        marker = prevCharacter.charCodeAt(0)
        Array(16)
          .fill()
          .forEach(() => doTheThingAndShiftMarker())
      }
      engourge()
      delete dictionaryToCreate[prevCharacter]
    }
    engourge()
  }

  // Mark the end of the stream
  setMarker(2)

  // Flush the last char
  flush()
  return data.join``
}

const has = (x, y) => Object.prototype.hasOwnProperty.call(x, y)
const isOdd = n => n & 1
const shiftBitRight = n => n << 1
const shiftBitLeft = n => n >> 1
const mergeBits = (n, m) => n | m
const is8Bit = c => c.charCodeAt(0) < 256

module.exports.compressUTF16 = compress
