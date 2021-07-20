

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = void 0

var _express = require("express")

var _articles = _interopRequireDefault(require("./articles.controller"))

var router = new _express.Router()
router.route("/").get(_articles["default"].apiGetArticles)
router.route("/all").get(_articles["default"].apiGetListOfAllArticles)
router.route("/search").get(_articles["default"].apiSearchArticles)
router.route("/").post(_articles["default"].apiInsertArticle)
router.route("/id/:id").get(_articles["default"].apiGetArticleById)
router.route("/id/:id").patch(_articles["default"].apiUpdateArticleById)
router.route("/id/:id")["delete"](_articles["default"].apiDeleteArticleById)
var _default = router
exports["default"] = _default
