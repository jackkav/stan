let placeholders = ['something', '', '']
test('empty', () => {
  expect(mergePlaceholders([])).toEqual(['something', '', ''])
})
test('five', () => {
  expect(mergePlaceholders('1,2,3,4,5'.split`,`)).toEqual('1,2,3,4,5'.split`,`)
})
test('three', () => {
  expect(mergePlaceholders('1,2,3'.split`,`)).toEqual('1,2,3'.split`,`)
})
test('two', () => {
  expect(mergePlaceholders(['1', '2'])).toEqual(['1', '2', ''])
})

let mergePlaceholders = a => {
  return a.concat(placeholders.slice(a.length, 3))
}
