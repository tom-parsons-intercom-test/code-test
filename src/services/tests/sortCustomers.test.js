const assert = require("assert")
const {sortCustomers} = require("../utils")

test("empty array returns an empty array", () => {
  expect(sortCustomers([], "user_id")).toEqual([])
})

describe("sort by", () => {
  test("objects with similar user_ids", () => {
    const testArray = [{user_id: 1}, {user_id: 7}, {user_id: 3}, {user_id: 1}]
    expect(sortCustomers(testArray, "user_id")).toEqual([{user_id: 1}, {user_id: 1}, {user_id: 3}, {user_id: 7}])
  })

  test("sort by words", () => {
    const testArray = [{name: "hello"}, {name: "world"}, {name: "aaron"}, {name: "Ben"}]
    expect(sortCustomers(testArray, "name")).toEqual([{name: "aaron"}, {name: "Ben"}, {name: "hello"}, {name: "world"}])
  })
}),

describe("sort direction", () => {
  const testArray = [{user_id: 1}, {user_id: 7}, {user_id: 3}]

  test("few objects ordered by user_id, defaults to asc", () => {
    expect(sortCustomers(testArray, "user_id")).toEqual([{user_id: 1}, {user_id: 3}, {user_id: 7}])
  })

  test("few objects ordered by user_id, defaults to asc, if order is not desc", () => {
    expect(sortCustomers(testArray, "user_id", "hello-world")).toEqual([{user_id: 1}, {user_id: 3}, {user_id: 7}])
  })

  test("few objects ordered by user_id, set to desc", () => {
    expect(sortCustomers(testArray, "user_id", "desc")).toEqual([{user_id: 7}, {user_id: 3}, {user_id: 1}])
  })
}),

describe("invalid order types", () => {
  const testArray = [{user_id: 1}, {user_id: 7}, {user_id: 3}]

  test("it throws when orderBy is not provided", () => {
    assert.throws(() => sortCustomers(testArray))
  })

  test("it throws when orderBy is invalid", () => {
    assert.throws(() => sortCustomers(testArray, "userId"))
  })
})
