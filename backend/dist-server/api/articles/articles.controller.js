

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
    {
      key: "apiSearchArticles",
      value: (function() {
        var _apiSearchArticles = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee2(
            req,
            res,
            next,
          ) {
            var ARTICLES_PER_PAGE,
              page,
              searchType,
              filters,
              _yield$ArticlesDAO$ge2,
              articlesList,
              totalNumArticles,
              response

            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    ARTICLES_PER_PAGE = 20

                    try {
                      page = req.query.page ? parseInt(req.query.page, 10) : 0
                    } catch (e) {
                      console.error("Got bad value for page:, ".concat(e))
                      page = 0
                    }

                    try {
                      searchType = Object.keys(req.query)[0]
                    } catch (error) {
                      console.error("No search key specified: ".concat(error))
                    }

                    filters = {}
                    _context2.t0 = searchType
                    _context2.next = _context2.t0 === "text" ? 7 : 9
                    break

                  case 7:
                    if (req.query.text !== "") {
                      filters.text = req.query.text
                    }

                    return _context2.abrupt("break", 9)

                  case 9:
                    _context2.next = 11
                    return _ArticlesDAO["default"].getArticles({
                      filters: filters,
                      page: page,
                      ARTICLES_PER_PAGE: ARTICLES_PER_PAGE,
                    })

                  case 11:
                    _yield$ArticlesDAO$ge2 = _context2.sent
                    articlesList = _yield$ArticlesDAO$ge2.articlesList
                    totalNumArticles = _yield$ArticlesDAO$ge2.totalNumArticles
                    response = {
                      articles: articlesList,
                      page: page,
                      filters: filters,
                      entries_per_page: ARTICLES_PER_PAGE,
                      total_results: totalNumArticles,
                    }
                    res.json(response)

                  case 16:
                  case "end":
                    return _context2.stop()
                }
              }
            }, _callee2)
          }),
        )

        function apiSearchArticles(_x4, _x5, _x6) {
          return _apiSearchArticles.apply(this, arguments)
        }

        return apiSearchArticles
      })(),
    },
  ])
  return ArticlesController
})()

exports["default"] = ArticlesController
