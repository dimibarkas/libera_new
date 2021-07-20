

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = calcDiffDays

function calcDiffDays(second) {
  return Math.round((second - new Date()) / (1000 * 60 * 60 * 24))
}

module.exports = calcDiffDays
