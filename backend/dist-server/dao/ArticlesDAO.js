

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
    },
    {
      key: "getArticles",
      value: (function() {
        var _getArticles = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee2() {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    return _context2.abrupt("return", {
                      articlesList: [],
                      totalNumArticles: [],
                    })

                  case 1:
                  case "end":
                    return _context2.stop()
                }
              }
            }, _callee2)
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
