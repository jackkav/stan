const emirp = `13
17
31
37
71
73
79
97
107
113
149
157
167
179
199
311
337
347
359
389
701
709
733
739
743
751
761
769
907
937
941
953
967
971
983
991`

test('emirp numbers', () => {
  expect(emirpNumbers().split`\n`.length).toEqual(emirp.split`\n`.length)
  expect(emirpNumbers()).toEqual(emirp)
})
const emirpNumbers = () => {
  p = n => {
    for (j = 2, r = 1; j < n; ) !(n % j++) && (r = 0)
    return r
  }
  x = n => {
    return [...Array(999).keys()].filter(a => {
      t = +[...(a + '')].reverse().join``
      return a ^ t && p(a) && p(t)
    })
  }
  return x().join`\n`
  // arr = []
  // for (a = 0; 999 > a; a++) {
  //   t = +[...(a + '')].reverse().join``
  //   if (a ^ t && p(a) && p(t)) arr.push(a)
  // }
  // return arr.join`\n`
}

test('prime numbers', () => {
  expect(primeNumbers(6)).toEqual(false)
  expect(primeNumbers(2)).toEqual(true)
  expect(primeNumbers(3)).toEqual(true)
})
const primeNumbers = i => {
  for (d = i - 1; d > 1; d--) {
    if (!(i % d)) return false
  }
  return true
}
test('prime', () => {
  expect(isPrime(0)).toBeFalsy()
  expect(isPrime(1)).toBeFalsy()
  expect(isPrime(2)).toBeTruthy()
  expect(isPrime(101)).toBeTruthy()
})
const isPrime = i => {
  // for (t = d = 2; d < i; ) t = i % d++ && t
  for (t = d = 2; d < i; ) return i % d++
  return i > 1
}
