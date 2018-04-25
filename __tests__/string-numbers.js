test('to number', () => {
  expect(r(0).trim()).toEqual('zero')
  expect(r(1).trim()).toEqual('one')
  expect(r(10).trim()).toEqual('ten')
  expect(r(100).trim()).toEqual('one hundred')
  expect(r(1000).trim()).toEqual('one thousand')
  expect(r(867).trim()).toEqual('eight hundred and sixty-seven')
  expect(r(2).trim()).toEqual('two')
  expect(r(999).trim()).toEqual('nine hundred and ninety-nine')
})
r = a => {
  for (
    s = '' + a,
      d = '0one0two0three0four0five0six0seven0eight0nine0ten0eleven0twelve0thirteen0fourteen0fifteen0sixteen0seventeen0eighteen0nineteen'
        .split`0`,
      e = '00twenty0thirty0forty0fifty0sixty0seventy0eighty0ninety'.split`0`,
      f = ['', 'thousand'],
      g = s.length,
      j = [];
    g > 0;

  )
    (h = g), j.push(s.slice((g = Math.max(0, g - 3)), h))
  for (q = [], o = 0; o < j.length; o++)
    j[o] &&
      (([x, y, z] = j[o].split``.reverse().map(x => +x)),
      1 == y && (x += 10),
      q.push(f[o]),
      q.push(d[x] + ' '),
      (p = e[y]) && (x && y && q.push`-`, q.push(p)),
      (x || y) && z && q.push`and `,
      (p = d[z]) && q.push(p + ' hundred '))

  return !+s ? 'zero' : q.reverse().join``
}
