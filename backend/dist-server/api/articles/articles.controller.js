

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

var _http = require("http2")

var _token = require("../../utils/token.js")

var _fs = _interopRequireDefault(require("fs"))

var _crypto = _interopRequireDefault(require("crypto"))

var config = {}

if (!process.env.JWT_PRIVATE_KEY) {
  config.jwtPrivateKey = _fs["default"].readFileSync("private.pem")
} else {
  config.jwtPrivateKey = Buffer.from(process.env.JWT_PRIVATE_KEY, "base64")
}

config.jwtPublicKey = _crypto["default"].createPublicKey(config.jwtPrivateKey)

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
                    //if user not registered
                    console.log(config.jwtPrivateKey)

                    if (
                      !(
                        !req.header("Authorization") ||
                        !(0, _token.isLoggedIn)(
                          req.header("Authorization"),
                          config.jwtPublicKey,
                        )
                      )
                    ) {
                      _context.next = 4
                      break
                    }

                    res.status(_http.constants.HTTP_STATUS_UNAUTHORIZED).send()
                    return _context.abrupt("return")

                  case 4:
                    ARTICLES_PER_PAGE = 20
                    _context.next = 7
                    return _ArticlesDAO["default"].getArticles()

                  case 7:
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

                  case 12:
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
    {
      key: "apiInsertArticle",
      value: (function() {
        var _apiInsertArticle = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee3(
            req,
            res,
            next,
          ) {
            var body, errors, response
            return _regenerator["default"].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.prev = 0
                      body = req.body
                      errors = {}

                      if (body && body.name.length < 3) {
                        errors.name =
                          "The name of the article must be at least 3 characters."
                      }

                      if (!(Object.keys(errors).length > 0)) {
                        _context3.next = 7
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "INSERTION_FAILED",
                        message: errors.name,
                      })
                      return _context3.abrupt("return")

                    case 7:
                      _context3.next = 9
                      return _ArticlesDAO["default"].insertArticle(body.name)

                    case 9:
                      response = _context3.sent

                      if (response) {
                        _context3.next = 13
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "ARTICLE_ALREADY_EXISTS",
                        message: "Insertion failed, article with name ".concat(
                          body.name,
                          " already exist",
                        ),
                      })
                      return _context3.abrupt("return")

                    case 13:
                      res.status(_http.constants.HTTP_STATUS_OK).json({
                        code: "INSERTION_SUCCED",
                        message: ""
                          .concat(response.insertedCount, " article with name ")
                          .concat(body.name, " and id ")
                          .concat(response.insertedId, " inserted."),
                      })
                      _context3.next = 19
                      break

                    case 16:
                      _context3.prev = 16
                      _context3.t0 = _context3["catch"](0)
                      res
                        .status(
                          _http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                        )
                        .json({
                          error: _context3.t0,
                        })

                    case 19:
                    case "end":
                      return _context3.stop()
                  }
                }
              },
              _callee3,
              null,
              [[0, 16]],
            )
          }),
        )

        function apiInsertArticle(_x7, _x8, _x9) {
          return _apiInsertArticle.apply(this, arguments)
        }

        return apiInsertArticle
      })(),
    },
    {
      key: "apiGetArticleById",
      value: (function() {
        var _apiGetArticleById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee4(
            req,
            res,
            next,
          ) {
            var id, article
            return _regenerator["default"].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      _context4.prev = 0
                      id = req.params.id || {}
                      _context4.next = 4
                      return _ArticlesDAO["default"].getArticleById(id)

                    case 4:
                      article = _context4.sent

                      if (article) {
                        _context4.next = 8
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_NOT_FOUND).json({
                        code: "ARTICLE_NOT_FOUND",
                        message: "Article with id ".concat(
                          id,
                          " could not be found.",
                        ),
                      })
                      return _context4.abrupt("return")

                    case 8:
                      if (!article.error) {
                        _context4.next = 11
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "ID_INCORRECT",
                        message: "Entered id ".concat(id, " was incorrect"),
                      })
                      return _context4.abrupt("return")

                    case 11:
                      res.status(_http.constants.HTTP_STATUS_OK).json({
                        _id: article._id,
                        name: article.name,
                      })
                      _context4.next = 17
                      break

                    case 14:
                      _context4.prev = 14
                      _context4.t0 = _context4["catch"](0)
                      res
                        .status(
                          _http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                        )
                        .json({
                          error: _context4.t0,
                        })

                    case 17:
                    case "end":
                      return _context4.stop()
                  }
                }
              },
              _callee4,
              null,
              [[0, 14]],
            )
          }),
        )

        function apiGetArticleById(_x10, _x11, _x12) {
          return _apiGetArticleById.apply(this, arguments)
        }

        return apiGetArticleById
      })(),
    },
    {
      key: "apiUpdateArticleById",
      value: (function() {
        var _apiUpdateArticleById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee5(
            req,
            res,
            next,
          ) {
            var _body$name,
              id,
              body,
              errors,
              _yield$ArticlesDAO$up,
              matchedCount,
              modifiedCount

            return _regenerator["default"].wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      _context5.prev = 0
                      id = req.params.id || {}
                      body = req.body
                      errors = {}

                      if (Object.keys(body).length === 0) {
                        errors.name =
                          "You have to specify a new or modified name for the article inside the body of your request."
                      } else if (
                        body &&
                        ((_body$name = body.name) === null ||
                        _body$name === void 0
                          ? void 0
                          : _body$name.length) < 3
                      ) {
                        errors.name =
                          "The name of the article must be at least 3 characters."
                      }

                      if (
                        (id === null || id === void 0 ? void 0 : id.length) !==
                        24
                      ) {
                        errors.id = "An error occured with the id"
                      }

                      if (!(Object.keys(errors).length > 0)) {
                        _context5.next = 9
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "PATCH_FAILED",
                        message: errors,
                      })
                      return _context5.abrupt("return")

                    case 9:
                      _context5.next = 11
                      return _ArticlesDAO["default"].updateArticleById(
                        id,
                        body.name,
                      )

                    case 11:
                      _yield$ArticlesDAO$up = _context5.sent
                      matchedCount = _yield$ArticlesDAO$up.matchedCount
                      modifiedCount = _yield$ArticlesDAO$up.modifiedCount

                      if (!(matchedCount === 1 && modifiedCount === 0)) {
                        _context5.next = 17
                        break
                      }

                      res
                        .status(_http.constants.HTTP_STATUS_NOT_MODIFIED)
                        .json({
                          code: "ARTICLE_NOT_MODIFIED",
                          message: "Article was found but not modified.",
                        })
                      return _context5.abrupt("return")

                    case 17:
                      if (modifiedCount) {
                        _context5.next = 20
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "PATCH_FAILED",
                        message: "No article with id ".concat(id, " found."),
                      })
                      return _context5.abrupt("return")

                    case 20:
                      res.status(_http.constants.HTTP_STATUS_OK).json({
                        code: "PATCH_SUCCED",
                        message: ""
                          .concat(modifiedCount, " Object with id ")
                          .concat(id, " modified."),
                      })
                      _context5.next = 26
                      break

                    case 23:
                      _context5.prev = 23
                      _context5.t0 = _context5["catch"](0)
                      res
                        .status(
                          _http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                        )
                        .json({
                          error: _context5.t0,
                        })

                    case 26:
                    case "end":
                      return _context5.stop()
                  }
                }
              },
              _callee5,
              null,
              [[0, 23]],
            )
          }),
        )

        function apiUpdateArticleById(_x13, _x14, _x15) {
          return _apiUpdateArticleById.apply(this, arguments)
        }

        return apiUpdateArticleById
      })(),
    },
    {
      key: "apiDeleteArticleById",
      value: (function() {
        var _apiDeleteArticleById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee6(
            req,
            res,
            next,
          ) {
            var id, errors, response
            return _regenerator["default"].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      _context6.prev = 0
                      id = req.params.id || {}
                      errors = {}

                      if (id.length !== 24) {
                        errors.id = "An error occured with the id"
                      }

                      if (!(Object.keys(errors).length > 0)) {
                        _context6.next = 7
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "DELETION_FAILED",
                        message: errors,
                      })
                      return _context6.abrupt("return")

                    case 7:
                      _context6.next = 9
                      return _ArticlesDAO["default"].deleteArticleById(id)

                    case 9:
                      response = _context6.sent

                      if (!(response.deletedCount < 1)) {
                        _context6.next = 13
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "DELETION_FAILED",
                        message: "No Article with id ".concat(id, " found."),
                      })
                      return _context6.abrupt("return")

                    case 13:
                      res.status(_http.constants.HTTP_STATUS_OK).json({
                        code: "DELETION_SUCCED",
                        message: ""
                          .concat(response.deletedCount, " Article with id ")
                          .concat(id, " deleted."),
                      })
                      _context6.next = 19
                      break

                    case 16:
                      _context6.prev = 16
                      _context6.t0 = _context6["catch"](0)
                      res
                        .status(
                          _http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                        )
                        .json({
                          error: _context6.t0,
                        })

                    case 19:
                    case "end":
                      return _context6.stop()
                  }
                }
              },
              _callee6,
              null,
              [[0, 16]],
            )
          }),
        )

        function apiDeleteArticleById(_x16, _x17, _x18) {
          return _apiDeleteArticleById.apply(this, arguments)
        }

        return apiDeleteArticleById
      })(),
    },
  ])
  return ArticlesController
})()

exports["default"] = ArticlesController
