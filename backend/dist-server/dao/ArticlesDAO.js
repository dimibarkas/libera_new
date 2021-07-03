

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

var articles
var DEFAULT_SORT = [["name", -1]]

var ArticlesDAO = /*#__PURE__*/ (function() {
  function ArticlesDAO() {
    ;(0, _classCallCheck2["default"])(this, ArticlesDAO)
  }

  ;(0, _createClass2["default"])(ArticlesDAO, null, [
    {
      key: "injectDB",
      value: (function() {
        var _injectDB = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee(conn) {
            return _regenerator["default"].wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      if (!articles) {
                        _context.next = 2
                        break
                      }

                      return _context.abrupt("return")

                    case 2:
                      _context.prev = 2
                      _context.next = 5
                      return conn
                        .db(process.env.LIBERA_NS)
                        .collection("articles")

                    case 5:
                      articles = _context.sent
                      this.articles = articles //this is only for testing

                      _context.next = 12
                      break

                    case 9:
                      _context.prev = 9
                      _context.t0 = _context["catch"](2)
                      console.error(
                        "Unable to establish a connection in UsersDAO: ".concat(
                          _context.t0,
                        ),
                      )

                    case 12:
                    case "end":
                      return _context.stop()
                  }
                }
              },
              _callee,
              this,
              [[2, 9]],
            )
          }),
        )

        function injectDB(_x) {
          return _injectDB.apply(this, arguments)
        }

        return injectDB
      })(),
      /**
       * Finds and returns articles matching a given text in their name.
       * @param {*}
       */
    },
    {
      key: "textSearch",
      value: function textSearch(text) {
        var query = {
          $text: {
            $search: text,
          },
        }
        var sort = []
        var project = {}
        return {
          query: query,
          project: project,
          sort: sort,
        }
      },
    },
    {
      key: "getArticles",
      value: (function() {
        var _getArticles = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee2() {
            var _ref,
              _ref$filters,
              filters,
              _ref$page,
              page,
              _ref$moviesPerPage,
              moviesPerPage,
              queryParams,
              _queryParams,
              _queryParams$query,
              query,
              _queryParams$project,
              project,
              _queryParams$sort,
              sort,
              cursor,
              displayCursor,
              articlesList,
              totalNumArticles,
              _args2 = arguments

            return _regenerator["default"].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      ;(_ref =
                        _args2.length > 0 && _args2[0] !== undefined
                          ? _args2[0]
                          : {}),
                        (_ref$filters = _ref.filters),
                        (filters =
                          _ref$filters === void 0 ? null : _ref$filters),
                        (_ref$page = _ref.page),
                        (page = _ref$page === void 0 ? 0 : _ref$page),
                        (_ref$moviesPerPage = _ref.moviesPerPage),
                        (moviesPerPage =
                          _ref$moviesPerPage === void 0
                            ? 20
                            : _ref$moviesPerPage)
                      queryParams = {}

                      if (filters) {
                        if ("text" in filters) {
                          queryParams = this.textSearch(filters["text"])
                        }
                      }

                      ;(_queryParams = queryParams),
                        (_queryParams$query = _queryParams.query),
                        (query =
                          _queryParams$query === void 0
                            ? {}
                            : _queryParams$query),
                        (_queryParams$project = _queryParams.project),
                        (project =
                          _queryParams$project === void 0
                            ? {}
                            : _queryParams$project),
                        (_queryParams$sort = _queryParams.sort),
                        (sort =
                          _queryParams$sort === void 0
                            ? DEFAULT_SORT
                            : _queryParams$sort)
                      _context2.prev = 4
                      _context2.next = 7
                      return articles
                        .find(query)
                        .project(project)
                        .sort(sort)

                    case 7:
                      cursor = _context2.sent
                      _context2.next = 14
                      break

                    case 10:
                      _context2.prev = 10
                      _context2.t0 = _context2["catch"](4)
                      console.error(
                        "Unable to issue find command, ".concat(_context2.t0),
                      )
                      return _context2.abrupt("return", {
                        articlesList: [],
                        totalNumArticles: 0,
                      })

                    case 14:
                      displayCursor = cursor
                        .limit(moviesPerPage)
                        .skip(moviesPerPage * page)
                      _context2.prev = 15
                      _context2.next = 18
                      return displayCursor.toArray()

                    case 18:
                      articlesList = _context2.sent

                      if (!(page === 0)) {
                        _context2.next = 25
                        break
                      }

                      _context2.next = 22
                      return articles.countDocuments(query)

                    case 22:
                      _context2.t1 = _context2.sent
                      _context2.next = 26
                      break

                    case 25:
                      _context2.t1 = 0

                    case 26:
                      totalNumArticles = _context2.t1
                      return _context2.abrupt("return", {
                        articlesList: articlesList,
                        totalNumArticles: totalNumArticles,
                      })

                    case 30:
                      _context2.prev = 30
                      _context2.t2 = _context2["catch"](15)
                      console.error(
                        "Unable to issue find command, ".concat(_context2.t2),
                      )

                    case 33:
                      return _context2.abrupt("return", {
                        articlesList: [],
                        totalNumArticles: 0,
                      })

                    case 34:
                    case "end":
                      return _context2.stop()
                  }
                }
              },
              _callee2,
              this,
              [
                [4, 10],
                [15, 30],
              ],
            )
          }),
        )

        function getArticles() {
          return _getArticles.apply(this, arguments)
        }

        return getArticles
      })(),
    },
  ])
  return ArticlesDAO
})()

exports["default"] = ArticlesDAO
