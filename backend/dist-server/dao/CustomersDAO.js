

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

var customers
var DEFAULT_SORT = []

var CustomersDAO = /*#__PURE__*/ (function() {
  function CustomersDAO() {
    ;(0, _classCallCheck2["default"])(this, CustomersDAO)
  }

  ;(0, _createClass2["default"])(CustomersDAO, null, [
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
                      if (!customers) {
                        _context.next = 2
                        break
                      }

                      return _context.abrupt("return")

                    case 2:
                      _context.prev = 2
                      _context.next = 5
                      return conn
                        .db(process.env.LIBERA_NS)
                        .collection("customers")

                    case 5:
                      customers = _context.sent
                      this.customers = customers //this is only for testing

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
       *
       * @param {*} param0
       * @returns
       */
    },
    {
      key: "getCustomers",
      value: (function() {
        var _getCustomers = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee2() {
            var _ref,
              _ref$filters,
              filters,
              _ref$page,
              page,
              _ref$customersPerPage,
              customersPerPage,
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
              customerList,
              totalNumCustomers,
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
                        (_ref$customersPerPage = _ref.customersPerPage),
                        (customersPerPage =
                          _ref$customersPerPage === void 0
                            ? 20
                            : _ref$customersPerPage)
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
                      return customers
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
                        customersList: [],
                        totalNumCustomers: 0,
                      })

                    case 14:
                      displayCursor = cursor
                        .limit(customersPerPage)
                        .skip(customersPerPage * page)
                      _context2.prev = 15
                      _context2.next = 18
                      return displayCursor.toArray()

                    case 18:
                      customerList = _context2.sent

                      if (!(page === 0)) {
                        _context2.next = 25
                        break
                      }

                      _context2.next = 22
                      return customers.countDocuments(query)

                    case 22:
                      _context2.t1 = _context2.sent
                      _context2.next = 26
                      break

                    case 25:
                      _context2.t1 = 0

                    case 26:
                      totalNumCustomers = _context2.t1
                      return _context2.abrupt("return", {
                        customerList: customerList,
                        totalNumCustomers: totalNumCustomers,
                      })

                    case 30:
                      _context2.prev = 30
                      _context2.t2 = _context2["catch"](15)
                      console.error(
                        "Unable to issue find command, ".concat(_context2.t2),
                      )

                    case 33:
                      return _context2.abrupt("return", {
                        customerList: [],
                        totalNumCustomers: 0,
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

        function getCustomers() {
          return _getCustomers.apply(this, arguments)
        }

        return getCustomers
      })(),
    },
    {
      key: "insertCustomer",
      value: (function() {
        var _insertCustomer = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee3(
            customerInfo,
          ) {
            var result,
              _yield$customers$inse,
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
                      return customers.findOne({
                        name: customerInfo.name,
                      })

                    case 3:
                      result = _context3.sent

                      if (result) {
                        _context3.next = 12
                        break
                      }

                      _context3.next = 7
                      return customers.insertOne({
                        name: customerInfo.name,
                        address: {
                          street: customerInfo.address.street,
                          nr: customerInfo.address.nr,
                          zipcode: customerInfo.address.zipcode,
                          city: customerInfo.address.city,
                          country: customerInfo.address.country,
                        },
                        phone: customerInfo.phone,
                      })

                    case 7:
                      _yield$customers$inse = _context3.sent
                      insertedCount = _yield$customers$inse.insertedCount
                      insertedId = _yield$customers$inse.insertedId
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

        function insertCustomer(_x2) {
          return _insertCustomer.apply(this, arguments)
        }

        return insertCustomer
      })(),
    },
    {
      key: "getCustomerById",
      value: (function() {
        var _getCustomerById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee4(id) {
            var result
            return _regenerator["default"].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      _context4.prev = 0
                      _context4.next = 3
                      return customers.findOne({
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
                        "Error occurred while searching customer, ".concat(
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

        function getCustomerById(_x3) {
          return _getCustomerById.apply(this, arguments)
        }

        return getCustomerById
      })(),
    },
    {
      key: "updateCustomerById",
      value: (function() {
        var _updateCustomerById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee5(
            id,
            customerInfo,
          ) {
            var result, response
            return _regenerator["default"].wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      _context5.prev = 0
                      _context5.next = 3
                      return this.getCustomerById(id)

                    case 3:
                      result = _context5.sent

                      if (!result) {
                        _context5.next = 11
                        break
                      }

                      _context5.next = 7
                      return customers.updateOne(
                        {
                          _id: (0, _bson.ObjectId)(id),
                        },
                        {
                          $set: {
                            name: customerInfo.name,
                            address: customerInfo.address,
                            phone: customerInfo.phone,
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

        function updateCustomerById(_x4, _x5) {
          return _updateCustomerById.apply(this, arguments)
        }

        return updateCustomerById
      })(),
    },
    {
      key: "deleteCustomerById",
      value: (function() {
        var _deleteCustomerById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee6(id) {
            var response
            return _regenerator["default"].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      _context6.prev = 0
                      _context6.next = 3
                      return customers.deleteOne({
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

        function deleteCustomerById(_x6) {
          return _deleteCustomerById.apply(this, arguments)
        }

        return deleteCustomerById
      })(),
    },
  ])
  return CustomersDAO
})()

exports["default"] = CustomersDAO
