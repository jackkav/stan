const sp = n => Array(n).fill` `.join``
const diamond = i => {
  if (i < 2) return sp(10 - i) + i
  let a = [sp(10 - i) + diamondRow(i)]
  for (let j = i - 1; j > 0; j--) {
    let s = sp(10 - i + i - j)
    a.unshift(s + diamondRow(j))
    a.push(s + diamondRow(j))
  }
  return a.join`\n`
}
const diamondRow = i => {
  if (i < 2) return i + ''
  let a = [i]
  for (let j = i - 1; j > 0; j--) a.unshift(j), a.push(j)

  return a.join``
}
test('diamond row', () => {
  expect(diamondRow(1)).toEqual(`1`)
  expect(diamondRow(2)).toEqual('121')
  expect(diamondRow(3)).toEqual('12321')
  expect(diamondRow(4)).toEqual('1234321')
})

test('diamond', () => {
  expect(diamond(1)).toEqual(`         1`)
  expect(diamond(2)).toEqual(`         1
        121
         1`)
  expect(diamond(3)).toEqual(`         1
        121
       12321
        121
         1`)
})
