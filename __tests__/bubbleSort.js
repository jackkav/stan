const bubbleSort = arr => {
  sa = Array.from(arr)
  do
    for (swap = 0, i = 0; ++i < sa.length; )
      if (sa[i - 1] > sa[i]) ([sa[i], sa[i - 1]] = [sa[i - 1], sa[i]]), (swap = true)
  while (swap)
  return sa
}

test('bubble sort', () => {
  expect(bubbleSort([3, 12, 9, 5])).toEqual([3, 5, 9, 12])
  expect(bubbleSort([39, 12, 9, 95])).toEqual([9, 12, 39, 95])
})
