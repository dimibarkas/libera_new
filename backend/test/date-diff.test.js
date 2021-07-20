import calcDiffDays from "../src/date-diff"

const date1 = new Date("7/14/2021")
test("Can calculate the difference between two given dates", () => {
  console.log(calcDiffDays(date1))
})
