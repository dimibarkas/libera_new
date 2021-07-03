

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = void 0

var _express = require("express")

var _articles = _interopRequireDefault(require("./articles.controller"))

var router = new _express.Router()
router.route("/").get(_articles["default"].apiGetArticles)
router.route("/search").get(_articles["default"].apiSearchArticles)
var _default = router
exports["default"] = _default
