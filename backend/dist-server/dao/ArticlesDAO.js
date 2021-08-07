

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

var _bson = require("bson")

var articles
var DEFAULT_SORT = []

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
      /**
       *
       * @param {*} param0
       * @returns
       */
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
              _ref$articlesPerPage,
              articlesPerPage,
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
                        (_ref$articlesPerPage = _ref.articlesPerPage),
                        (articlesPerPage =
                          _ref$articlesPerPage === void 0
                            ? 20
                            : _ref$articlesPerPage)
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
                        .limit(articlesPerPage)
                        .skip(articlesPerPage * page)
                      _context2.prev = 15
                      _context2.next = 18
                      return displayCursor.toArray()

                    case 18:
                      articlesList = _context2.sent
                      _context2.next = 21
                      return articles.countDocuments(query)

                    case 21:
                      totalNumArticles = _context2.sent
                      return _context2.abrupt("return", {
                        articlesList: articlesList,
                        totalNumArticles: totalNumArticles,
                      })

                    case 25:
                      _context2.prev = 25
                      _context2.t1 = _context2["catch"](15)
                      console.error(
                        "Unable to issue find command, ".concat(_context2.t1),
                      )

                    case 28:
                      return _context2.abrupt("return", {
                        articlesList: [],
                        totalNumArticles: 0,
                      })

                    case 29:
                    case "end":
                      return _context2.stop()
                  }
                }
              },
              _callee2,
              this,
              [
                [4, 10],
                [15, 25],
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
    {
      key: "insertArticle",
      value: (function() {
        var _insertArticle = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee3(name) {
            var result,
              _yield$articles$inser,
              insertedCount,
              insertedId,
              response

            return _regenerator["default"].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.prev = 0
                      _context3.next = 3
                      return articles.findOne({
                        name: name,
                      })

                    case 3:
                      result = _context3.sent

                      if (result) {
                        _context3.next = 12
                        break
                      }

                      _context3.next = 7
                      return articles.insertOne({
                        name: name,
                      })

                    case 7:
                      _yield$articles$inser = _context3.sent
                      insertedCount = _yield$articles$inser.insertedCount
                      insertedId = _yield$articles$inser.insertedId
                      response = {
                        insertedCount: insertedCount,
                        insertedId: insertedId,
                      }
                      return _context3.abrupt("return", response)

                    case 12:
                      return _context3.abrupt("return", null)

                    case 15:
                      _context3.prev = 15
                      _context3.t0 = _context3["catch"](0)
                      console.error(
                        "Error occurred while adding a new article, ".concat(
                          _context3.t0,
                          ".",
                        ),
                      )
                      return _context3.abrupt("return", {
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
              [[0, 15]],
            )
          }),
        )

        function insertArticle(_x2) {
          return _insertArticle.apply(this, arguments)
        }

        return insertArticle
      })(),
    },
    {
      key: "getArticleById",
      value: (function() {
        var _getArticleById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee4(id) {
            var result
            return _regenerator["default"].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      _context4.prev = 0
                      _context4.next = 3
                      return articles.findOne({
                        _id: (0, _bson.ObjectId)(id),
                      })

                    case 3:
                      result = _context4.sent

                      if (result) {
                        _context4.next = 6
                        break
                      }

                      return _context4.abrupt("return", null)

                    case 6:
                      return _context4.abrupt("return", result)

                    case 9:
                      _context4.prev = 9
                      _context4.t0 = _context4["catch"](0)
                      console.error(
                        "Error occurred while searching article, ".concat(
                          _context4.t0,
                          ".",
                        ),
                      )
                      return _context4.abrupt("return", {
                        error: _context4.t0,
                      })

                    case 13:
                    case "end":
                      return _context4.stop()
                  }
                }
              },
              _callee4,
              null,
              [[0, 9]],
            )
          }),
        )

        function getArticleById(_x3) {
          return _getArticleById.apply(this, arguments)
        }

        return getArticleById
      })(),
    },
    {
      key: "updateArticleById",
      value: (function() {
        var _updateArticleById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee5(
            id,
            name,
          ) {
            var result, response
            return _regenerator["default"].wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      _context5.prev = 0
                      _context5.next = 3
                      return this.getArticleById(id)

                    case 3:
                      result = _context5.sent

                      if (!result) {
                        _context5.next = 11
                        break
                      }

                      _context5.next = 7
                      return articles.updateOne(
                        {
                          _id: (0, _bson.ObjectId)(id),
                        },
                        {
                          $set: {
                            name: name,
                          },
                        },
                      )

                    case 7:
                      response = _context5.sent

                      if (!response) {
                        _context5.next = 10
                        break
                      }

                      return _context5.abrupt("return", response)

                    case 10:
                      return _context5.abrupt("return", null)

                    case 11:
                      return _context5.abrupt("return", null)

                    case 14:
                      _context5.prev = 14
                      _context5.t0 = _context5["catch"](0)
                      console.error(
                        "Error occurred while updating article, ".concat(
                          _context5.t0,
                          ".",
                        ),
                      )
                      return _context5.abrupt("return", {
                        error: _context5.t0,
                      })

                    case 18:
                    case "end":
                      return _context5.stop()
                  }
                }
              },
              _callee5,
              this,
              [[0, 14]],
            )
          }),
        )

        function updateArticleById(_x4, _x5) {
          return _updateArticleById.apply(this, arguments)
        }

        return updateArticleById
      })(),
    },
    {
      key: "deleteArticleById",
      value: (function() {
        var _deleteArticleById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee6(id) {
            var response
            return _regenerator["default"].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      _context6.prev = 0
                      _context6.next = 3
                      return articles.deleteOne({
                        _id: (0, _bson.ObjectId)(id),
                      })

                    case 3:
                      response = _context6.sent

                      if (!response) {
                        _context6.next = 6
                        break
                      }

                      return _context6.abrupt("return", response)

                    case 6:
                      return _context6.abrupt("return", null)

                    case 9:
                      _context6.prev = 9
                      _context6.t0 = _context6["catch"](0)
                      console.error(
                        "Error occurred while deleting the article, ".concat(
                          _context6.t0,
                          ".",
                        ),
                      )
                      return _context6.abrupt("return", {
                        error: _context6.t0,
                      })

                    case 13:
                    case "end":
                      return _context6.stop()
                  }
                }
              },
              _callee6,
              null,
              [[0, 9]],
            )
          }),
        )

        function deleteArticleById(_x6) {
          return _deleteArticleById.apply(this, arguments)
        }

        return deleteArticleById
      })(),
    },
    {
      key: "getAllArticles",
      value: (function() {
        var _getAllArticles = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee7() {
            var response
            return _regenerator["default"].wrap(
              function _callee7$(_context7) {
                while (1) {
                  switch ((_context7.prev = _context7.next)) {
                    case 0:
                      _context7.prev = 0
                      _context7.next = 3
                      return articles
                        .find({})
                        .project({
                          _id: 0,
                          name: 1,
                        })
                        .toArray()

                    case 3:
                      response = _context7.sent

                      if (!response) {
                        _context7.next = 6
                        break
                      }

                      return _context7.abrupt("return", response)

                    case 6:
                      return _context7.abrupt("return", null)

                    case 9:
                      _context7.prev = 9
                      _context7.t0 = _context7["catch"](0)
                      console.error(
                        "Error occurred while deleting the article, ".concat(
                          _context7.t0,
                          ".",
                        ),
                      )
                      return _context7.abrupt("return", {
                        error: _context7.t0,
                      })

                    case 13:
                    case "end":
                      return _context7.stop()
                  }
                }
              },
              _callee7,
              null,
              [[0, 9]],
            )
          }),
        )

        function getAllArticles() {
          return _getAllArticles.apply(this, arguments)
        }

        return getAllArticles
      })(),
    },
  ])
  return ArticlesDAO
})()

exports["default"] = ArticlesDAO
