test('pointInPoly', () => {
  let poly = [[-1, -1], [1, -1], [0, 1]]
  expect(pointInPoly(poly, [0, 0])).toEqual(true)
  var poly2 = [[-5, -5], [5, -5], [5, 5], [-5, 5]]

  expect(pointInPoly(poly2, [-6, 0])).toEqual(false)
  expect(pointInPoly(poly2, [1, 1])).toEqual(true)
})
function pointInPoly(poly, point) {
  var x = point[0]
  var y = point[1]

  var isInside = false
  for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    var xi = poly[i][0]
    var yi = poly[i][1]

    var xj = poly[j][0]
    var yj = poly[j][1]

    var shouldCheck = yi > y !== yj > y
    if (shouldCheck) {
      var slope = (xj - xi) / (yj - yi)

      if (x < slope * (y - yi) + xi) {
        isInside = !isInside
      }
    }
  }

  return isInside
}
