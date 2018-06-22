const sp = n => n > 0 && Array(n).fill` `.join``
const diamond = i => {
  let a = [sp(10 - i) + diamondRowGolfed(i, '')]
  // let a = [sp(10 - i) + diamondRow(i)]
  for (let j = i - 1; j > 0; j--) {
    let s = sp(10 - j)
    a.unshift(s + diamondRow(j))
    a.push(s + diamondRow(j))
  }
  return a.join`\n`
}
const diamondRow = i => {
  return diamondLoop(i, i).join``
}
const diamondLoop = (n, initial, spaces, next) => {
  let a = [sp(spaces - n) + initial]
  for (let j = n - 1; j > 0; j--) {
    let s = sp(spaces - j)
    a.unshift(s + (next || j))
    a.push(s + (next || j))
  }
  return a
}
const diamondRowGolfed = (i, p) => {
  for (j = i - 1, a = [i]; j; j--) a.unshift(j), a.push(j)
  return a.join(p)
}
const diamondColumn = i => {
  return diamondLoop(i, i, 10, diamondLoop(i, i, 0).join``).join`\n`
}
test('diamond row', () => {
  // expect(diamondColumn(1)).toEqual(`         1`)
  // expect(diamondColumn(2)).toEqual(`         1
  //        121
  //         1`)
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

//golfed
// t = n => Array(10 - n).fill` `.join``
// r = i => {
//   for (k = i - 1, b = [i]; k; k--) b.unshift(k), b.push(k)
//   return b.join``
// }
// d = _ => {
//   let o = ''
//   for (x = 1; x <= 9; x++) {
//     for (j = x - 1, a = [t(x) + r(x)]; j; j--) (s = t(j)), a.unshift(s + r(j)), a.push(s + r(j))
//     o += a.join`\n` + '\n'
//   }
//   return o
// }
// expect(d(3)).toContain(`12345678987654321`)
