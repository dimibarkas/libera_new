

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

var users

var UsersDAO = /*#__PURE__*/ (function() {
  function UsersDAO() {
    ;(0, _classCallCheck2["default"])(this, UsersDAO)
  }

  ;(0, _createClass2["default"])(UsersDAO, null, [
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
                      if (!users) {
                        _context.next = 2
                        break
                      }

                      return _context.abrupt("return")

                    case 2:
                      _context.prev = 2
                      _context.next = 5
                      return conn.db(process.env.LIBERA_NS).collection("users")

                    case 5:
                      users = _context.sent
                      _context.next = 11
                      break

                    case 8:
                      _context.prev = 8
                      _context.t0 = _context["catch"](2)
                      console.error(
                        "Unable to establish a connection in UsersDAO: ".concat(
                          _context.t0,
                        ),
                      )

                    case 11:
                    case "end":
                      return _context.stop()
                  }
                }
              },
              _callee,
              null,
              [[2, 8]],
            )
          }),
        )

        function injectDB(_x) {
          return _injectDB.apply(this, arguments)
        }

        return injectDB
      })(),
      /**
       * Finds a user in the users collection
       * @param {*} username - The username of the desired user
       * @returns {Object|null} Return either a single user or nothin
       */
    },
    {
      key: "findByUsername",
      value: (function() {
        var _findByUsername = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee2(
            username,
          ) {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    _context2.next = 2
                    return users.findOne({
                      username: username,
                    })

                  case 2:
                    return _context2.abrupt("return", _context2.sent)

                  case 3:
                  case "end":
                    return _context2.stop()
                }
              }
            }, _callee2)
          }),
        )

        function findByUsername(_x2) {
          return _findByUsername.apply(this, arguments)
        }

        return findByUsername
      })(),
      /**
       * Adds a user to the `users` collection
       * @param {UserInfo} userInfo - The information of the user to add
       * @returns {DAOResponse} Returns either a "success" or an "error" Object
       */
    },
    {
      key: "createAccount",
      value: (function() {
        var _createAccount = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee3(
            userInfo,
          ) {
            var result, _yield$users$insertOn, insertedCount

            return _regenerator["default"].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.prev = 0
                      _context3.next = 3
                      return users.findOne({
                        username: userInfo.username,
                      })

                    case 3:
                      result = _context3.sent

                      if (result) {
                        _context3.next = 10
                        break
                      }

                      _context3.next = 7
                      return users.insertOne({
                        name: userInfo.name,
                        username: userInfo.username,
                        password: userInfo.password,
                      })

                    case 7:
                      _yield$users$insertOn = _context3.sent
                      insertedCount = _yield$users$insertOn.insertedCount
                      return _context3.abrupt("return", {
                        insertedCount: insertedCount,
                      })

                    case 10:
                      return _context3.abrupt("return", null)

                    case 13:
                      _context3.prev = 13
                      _context3.t0 = _context3["catch"](0)
                      console.error(
                        "Error occurred while adding new user, ".concat(
                          _context3.t0,
                          ".",
                        ),
                      )
                      return _context3.abrupt("return", {
                        error: _context3.t0,
                      })

                    case 17:
                    case "end":
                      return _context3.stop()
                  }
                }
              },
              _callee3,
              null,
              [[0, 13]],
            )
          }),
        )

        function createAccount(_x3) {
          return _createAccount.apply(this, arguments)
        }

        return createAccount
      })(),
    },
    {
      key: "deleteAccountByUsername",
      value: (function() {
        var _deleteAccountByUsername = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee4(
            username,
          ) {
            var response
            return _regenerator["default"].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      _context4.prev = 0
                      _context4.next = 3
                      return users.deleteOne({
                        username: username,
                      })

                    case 3:
                      response = _context4.sent

                      if (!response) {
                        _context4.next = 6
                        break
                      }

                      return _context4.abrupt("return", response)

                    case 6:
                      return _context4.abrupt("return", null)

                    case 9:
                      _context4.prev = 9
                      _context4.t0 = _context4["catch"](0)
                      console.error(
                        "Error occurred while deleting the article, ".concat(
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

        function deleteAccountByUsername(_x4) {
          return _deleteAccountByUsername.apply(this, arguments)
        }

        return deleteAccountByUsername
      })(),
    },
  ])
  return UsersDAO
})()

exports["default"] = UsersDAO
