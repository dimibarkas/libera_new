var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = void 0

var _express = require("express")

var _users = _interopRequireDefault(require("./users.controller"))

var router = new _express.Router()
router.route("/register").post(_users["default"].handleRegister)
router.route("/login").post(_users["default"].handleLogin)
var _default = router
exports["default"] = _default
