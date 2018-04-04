const lookup = {
  E: '0',
  T: '1',
  I: '00',
  A: '01',
  N: '10',
  M: '11',
  S: '000',
  U: '001',
  R: '010',
  W: '011',
  D: '100',
  K: '101',
  G: '110',
  O: '111',
  H: '0000',
  V: '0001',
  F: '0010',
  1: '0011',
  L: '0100',
  2: '0101',
  P: '0110',
  J: '0111',
  B: '1000',
  X: '1001',
  C: '1010',
  Y: '1011',
  Z: '1100',
  Q: '1101',
  3: '1110',
  4: '',
}

test('generate a morse code lookup table', () => {
  expect(makeLookup()).toEqual(lookup)
})

const makeLookup = () => {
  const s = [...'ETIANMSURWDKGOHVF1L2PJBXCYZQ34']
  let r = {}
  s.forEach((x, i) => {
    i < 2
      ? (r[x] = '' + i)
      : i < 6
        ? (r[x] = toBinary(i - 2, 2))
        : i < 14 ? (r[x] = toBinary(i - 6, 3)) : i < 29 ? (r[x] = toBinary(i - 14, 4)) : (r[x] = '')
  })
  return r
}
const toBinary = (i, s) => {
  return i.toString(2).padStart(s, '0')
}

// golfed
const m = () => {
  s = [...'ETIANMSURWDKGOHVF1L2PJBXCYZQ34']
  r = {}
  for (i = 0; i < 30; i++) {
    i < 2
      ? (r[x] = '' + i)
      : i < 6 ? (r[x] = b(i - 2, 2)) : i < 14 ? (r[x] = b(i - 6, 3)) : i < 29 ? (r[x] = b(i - 14, 4)) : (r[x] = '')
  }
}
b = (i, s) => i.toString(2).padStart(s, '0')
