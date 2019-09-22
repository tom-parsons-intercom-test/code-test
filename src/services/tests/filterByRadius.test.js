const {filterByRadius} = require("../utils")

test("empty array returns an empty array", () => {
  expect(filterByRadius([])).toEqual([])
})

describe("basic limits", () => {
  const centerLat = 0
  const centerLng = 0
  const maxRadius = 100

  test("within limit", () => {
    const testArray = [{latitude: 0.1, longitude: 0.1}]
    expect(filterByRadius(testArray, centerLat, centerLng, maxRadius)).toEqual([{latitude: 0.1, longitude: 0.1}])
  })

  test("outside of limit", () => {
    const testArray = [{latitude: 10, longitude: 10}]
    expect(filterByRadius(testArray, centerLat, centerLng, maxRadius)).toEqual([])
  })

  test("just under a 100 k limit", () => {
    const testArray = [{latitude: 0.63, longitude: 0.63}]
    expect(filterByRadius(testArray, centerLat, centerLng, maxRadius)).toEqual([{latitude: 0.63, longitude: 0.63}])
  })

  test("(pretty much) bang on 100k - gets excluded ", () => {
    const testArray = [{latitude: 0.635923, longitude: 0.635923}]
    expect(filterByRadius(testArray, centerLat, centerLng, maxRadius)).toEqual([])
  })
})

describe("ireland limits", () => {
  const centerLat = 53.339428
  const centerLng = -6.257664
  const maxRadius = 100

  test("under a 100 k limit", () => {
    const testArray = [{latitude: 53.63, longitude: -6.33}]
    expect(filterByRadius(testArray, centerLat, centerLng, maxRadius)).toEqual([{latitude: 53.63, longitude: -6.33}])
  })

  test("add on 100k - gets excluded ", () => {
    const testArray = [{latitude: 0.635923, longitude: 0.635923}]
    expect(filterByRadius(testArray, centerLat, centerLng, maxRadius)).toEqual([])
  })
})
