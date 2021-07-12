

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports.removeBearerPrefix = removeBearerPrefix
exports.isLoggedIn = isLoggedIn
exports.parseToken = parseToken

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"))

function removeBearerPrefix(headerString) {
  return headerString.replace("Bearer ", "")
}

function isLoggedIn(token, publicKey) {
  try {
    _jsonwebtoken["default"].verify(removeBearerPrefix(token), publicKey, {
      algorithms: "ES512",
    })
  } catch (err) {
    return false
  }

  return true
}

function parseToken(token) {
  return _jsonwebtoken["default"].decode(removeBearerPrefix(token))
}
