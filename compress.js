const compress = uncompressed => {
  // Build the dictionary.
  let i
  let dictionary = {}
  let c
  let wc
  let w = ''
  let result = []
  let dictSize = 256
  // Array(256)
  //   .fill()
  //   .forEach((e, i) => (dictionary[String.fromCharCode(i)] = i))
  for (i = 0; i < 256; i += 1) {
    dictionary[String.fromCharCode(i)] = i
  }

  for (i = 0; i < uncompressed.length; i += 1) {
    c = uncompressed.charAt(i)
    wc = w + c
    //Do not use dictionary[wc] because javascript arrays
    //will return values for array['pop'], array['push'] etc
    // if (dictionary[wc]) {
    if (dictionary.hasOwnProperty(wc)) {
      w = wc
    } else {
      result.push(dictionary[w])
      // Add wc to the dictionary.
      dictionary[wc] = dictSize++
      w = String(c)
    }
  }

  // Output the code for w.
  if (w !== '') {
    result.push(dictionary[w])
  }
  return result
}
const compressGolfed = u => {
  let i, c, wc
  let d = {}
  let w = ''
  let r = []
  let s = 256
  for (i = 0; i < s; i++) d[String.fromCharCode(i)] = i
  for (i = 0; i < u.length; i++) {
    c = u.charAt(i)
    wc = w + c
    if (d.hasOwnProperty(wc)) w = wc
    else {
      r.push(d[w])
      d[wc] = s++
      w = c
    }
  }
  if (w !== '') r.push(d[w])
  return r
}
const decompress = compressed => {
  // Build the dictionary.
  let i
  let dictionary = {}
  let k
  let w = ''
  let result
  let dictSize = 256
  let entry = ''
  for (i = 0; i < 256; i += 1) {
    dictionary[i] = String.fromCharCode(i)
  }

  w = String.fromCharCode(compressed[0])
  result = w
  for (i = 1; i < compressed.length; i += 1) {
    k = compressed[i]
    if (dictionary[k]) {
      entry = dictionary[k]
    } else {
      if (k === dictSize) {
        entry = w + w.charAt(0)
      } else {
        return null
      }
    }

    result += entry

    // Add w+entry[0] to the dictionary.
    dictionary[dictSize++] = w + entry.charAt(0)

    w = entry
  }
  return result
}

module.exports.compress = compressGolfed
module.exports.decompress = decompress
