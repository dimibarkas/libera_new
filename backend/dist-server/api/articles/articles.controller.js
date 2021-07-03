

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = void 0

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"))

var _asyncToGenerator2 = _interopRequireDefault(
  require("@babel/runtime/helpers/asyncToGenerator"),
)

var _classCallCheck2 = _interopRequireDefault(
  require("@babel/runtime/helpers/classCallCheck"),
)

var _createClass2 = _interopRequireDefault(
  require("@babel/runtime/helpers/createClass"),
)

var _ArticlesDAO = _interopRequireDefault(require("../../dao/ArticlesDAO.js"))

var ArticlesController = /*#__PURE__*/ (function() {
  function ArticlesController() {
    ;(0, _classCallCheck2["default"])(this, ArticlesController)
  }

  ;(0, _createClass2["default"])(ArticlesController, null, [
    {
      key: "apiGetArticles",
      value: (function() {
        var _apiGetArticles = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee(
            req,
            res,
            next,
          ) {
            var ARTICLES_PER_PAGE,
              _yield$ArticlesDAO$ge,
              articlesList,
              totalNumArticles,
              response

            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    ARTICLES_PER_PAGE = 20
                    _context.next = 3
                    return _ArticlesDAO["default"].getArticles()

                  case 3:
                    _yield$ArticlesDAO$ge = _context.sent
                    articlesList = _yield$ArticlesDAO$ge.articlesList
                    totalNumArticles = _yield$ArticlesDAO$ge.totalNumArticles
                    response = {
                      articles: articlesList,
                      page: 0,
                      filters: {},
                      entries_per_page: ARTICLES_PER_PAGE,
                      total_results: totalNumArticles,
                    }
                    res.json(response)

                  case 8:
                  case "end":
                    return _context.stop()
                }
              }
            }, _callee)
          }),
        )

        function apiGetArticles(_x, _x2, _x3) {
          return _apiGetArticles.apply(this, arguments)
        }

        return apiGetArticles
      })(),
    },
  ])
  return ArticlesController
})()

exports["default"] = ArticlesController
