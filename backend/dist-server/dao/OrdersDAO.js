

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

var _dateFns = require("date-fns")

var _ArticlesDAO = _interopRequireDefault(require("./ArticlesDAO"))

var orders
var DEFAULT_SORT = []

var OrdersDAO = /*#__PURE__*/ (function() {
  function OrdersDAO() {
    ;(0, _classCallCheck2["default"])(this, OrdersDAO)
  }

  ;(0, _createClass2["default"])(OrdersDAO, null, [
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
                      if (!orders) {
                        _context.next = 2
                        break
                      }

                      return _context.abrupt("return")

                    case 2:
                      _context.prev = 2
                      _context.next = 5
                      return conn.db(process.env.LIBERA_NS).collection("orders")

                    case 5:
                      orders = _context.sent
                      this.orders = orders //this is only for testing

                      _context.next = 12
                      break

                    case 9:
                      _context.prev = 9
                      _context.t0 = _context["catch"](2)
                      console.error(
                        "Unable to establish a connection in OrderssDAO: ".concat(
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
      key: "getOrders",
      value: (function() {
        var _getOrders = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee2() {
            var _ref,
              _ref$filters,
              filters,
              _ref$page,
              page,
              _ref$ordersPerPage,
              ordersPerPage,
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
              ordersList,
              totalNumOrders,
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
                        (_ref$ordersPerPage = _ref.ordersPerPage),
                        (ordersPerPage =
                          _ref$ordersPerPage === void 0
                            ? 20
                            : _ref$ordersPerPage)
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
                      return orders
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
                        ordersList: [],
                        totalNumOrders: 0,
                      })

                    case 14:
                      displayCursor = cursor
                        .limit(ordersPerPage)
                        .skip(ordersPerPage * page)
                      _context2.prev = 15
                      _context2.next = 18
                      return displayCursor.toArray()

                    case 18:
                      ordersList = _context2.sent

                      if (!(page === 0)) {
                        _context2.next = 25
                        break
                      }

                      _context2.next = 22
                      return orders.countDocuments(query)

                    case 22:
                      _context2.t1 = _context2.sent
                      _context2.next = 26
                      break

                    case 25:
                      _context2.t1 = 0

                    case 26:
                      totalNumOrders = _context2.t1
                      return _context2.abrupt("return", {
                        ordersList: ordersList,
                        totalNumOrders: totalNumOrders,
                      })

                    case 30:
                      _context2.prev = 30
                      _context2.t2 = _context2["catch"](15)
                      console.error(
                        "Unable to issue find command, ".concat(_context2.t2),
                      )

                    case 33:
                      return _context2.abrupt("return", {
                        ordersList: [],
                        totalNumOrders: 0,
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

        function getOrders() {
          return _getOrders.apply(this, arguments)
        }

        return getOrders
      })(),
    },
    {
      key: "getOrderById",
      value: (function() {
        var _getOrderById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee3(id) {
            var result
            return _regenerator["default"].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.prev = 0
                      _context3.next = 3
                      return orders.findOne({
                        _id: (0, _bson.ObjectId)(id),
                      })

                    case 3:
                      result = _context3.sent

                      if (result) {
                        _context3.next = 6
                        break
                      }

                      return _context3.abrupt("return", null)

                    case 6:
                      return _context3.abrupt("return", result)

                    case 9:
                      _context3.prev = 9
                      _context3.t0 = _context3["catch"](0)
                      console.error(
                        "Error occurred while searching article, ".concat(
                          _context3.t0,
                          ".",
                        ),
                      )
                      return _context3.abrupt("return", {
                        error: _context3.t0,
                      })

                    case 13:
                    case "end":
                      return _context3.stop()
                  }
                }
              },
              _callee3,
              null,
              [[0, 9]],
            )
          }),
        )

        function getOrderById(_x2) {
          return _getOrderById.apply(this, arguments)
        }

        return getOrderById
      })(),
    },
    {
      key: "insertOrder",
      value: (function() {
        var _insertOrder = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee4(
            orderData,
          ) {
            var result,
              _yield$orders$insertO,
              insertedCount,
              insertedId,
              response

            return _regenerator["default"].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      _context4.prev = 0
                      _context4.next = 3
                      return orders.findOne({
                        $and: [
                          {
                            customer_name: orderData.customer_name,
                          },
                          {
                            date: orderData.date,
                          },
                        ],
                      })

                    case 3:
                      result = _context4.sent

                      if (result) {
                        _context4.next = 12
                        break
                      }

                      _context4.next = 7
                      return orders.insertOne({
                        customer_name: orderData.customer_name,
                        date: new Date(orderData.date),
                        positions: orderData.positions,
                      })

                    case 7:
                      _yield$orders$insertO = _context4.sent
                      insertedCount = _yield$orders$insertO.insertedCount
                      insertedId = _yield$orders$insertO.insertedId
                      response = {
                        insertedCount: insertedCount,
                        insertedId: insertedId,
                      }
                      return _context4.abrupt("return", response)

                    case 12:
                      return _context4.abrupt("return", null)

                    case 15:
                      _context4.prev = 15
                      _context4.t0 = _context4["catch"](0)
                      console.error(
                        "\n        Error occurred while adding a new order for\n        "
                          .concat(orderData.customer_name, " at ")
                          .concat(orderData.date, " , ")
                          .concat(_context4.t0, "."),
                      )
                      return _context4.abrupt("return", {
                        error: _context4.t0,
                      })

                    case 19:
                    case "end":
                      return _context4.stop()
                  }
                }
              },
              _callee4,
              null,
              [[0, 15]],
            )
          }),
        )

        function insertOrder(_x3) {
          return _insertOrder.apply(this, arguments)
        }

        return insertOrder
      })(),
    },
    {
      key: "deleteOrderById",
      value: (function() {
        var _deleteOrderById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee5(id) {
            var response
            return _regenerator["default"].wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      _context5.prev = 0
                      _context5.next = 3
                      return orders.deleteOne({
                        _id: (0, _bson.ObjectId)(id),
                      })

                    case 3:
                      response = _context5.sent

                      if (!response) {
                        _context5.next = 6
                        break
                      }

                      return _context5.abrupt("return", response)

                    case 6:
                      return _context5.abrupt("return", null)

                    case 9:
                      _context5.prev = 9
                      _context5.t0 = _context5["catch"](0)
                      console.error(
                        "Error occurred while deleting the article, ".concat(
                          _context5.t0,
                          ".",
                        ),
                      )
                      return _context5.abrupt("return", {
                        error: _context5.t0,
                      })

                    case 13:
                    case "end":
                      return _context5.stop()
                  }
                }
              },
              _callee5,
              null,
              [[0, 9]],
            )
          }),
        )

        function deleteOrderById(_x4) {
          return _deleteOrderById.apply(this, arguments)
        }

        return deleteOrderById
      })(),
    },
    {
      key: "getCurrentOrders",
      value: (function() {
        var _getCurrentOrders = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee6(number) {
            var suggestedDate, cursor, searchDate, ordersList
            return _regenerator["default"].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      suggestedDate = null
                      _context6.prev = 1

                      if (!isNaN(number)) {
                        _context6.next = 4
                        break
                      }

                      throw new Error(
                        "".concat(
                          number,
                          " is not a number, please provide a number as argument",
                        ),
                      )

                    case 4:
                      if (number < 0) {
                        suggestedDate = (0, _dateFns.subDays)(
                          new Date(),
                          Math.abs(number),
                        )
                      }

                      if (number > 0) {
                        suggestedDate = (0, _dateFns.addDays)(
                          new Date(),
                          number,
                        )
                      }

                      searchDate =
                        suggestedDate === null
                          ? (0, _dateFns.startOfToday)()
                          : (0, _dateFns.startOfDay)(suggestedDate)
                      console.log("Searching orders for date: " + searchDate)
                      _context6.next = 10
                      return orders.find({
                        date: {
                          $gte:
                            suggestedDate === null
                              ? (0, _dateFns.startOfToday)()
                              : (0, _dateFns.startOfDay)(suggestedDate),
                          $lte:
                            suggestedDate === null
                              ? (0, _dateFns.endOfToday)()
                              : (0, _dateFns.endOfDay)(suggestedDate),
                        },
                      })

                    case 10:
                      cursor = _context6.sent
                      _context6.next = 17
                      break

                    case 13:
                      _context6.prev = 13
                      _context6.t0 = _context6["catch"](1)
                      console.error(
                        "Unable to issue find command, ".concat(_context6.t0),
                      )
                      return _context6.abrupt("return", {
                        ordersList: [],
                        totalNumOrders: 0,
                      })

                    case 17:
                      _context6.prev = 17
                      _context6.next = 20
                      return cursor.toArray()

                    case 20:
                      ordersList = _context6.sent
                      return _context6.abrupt("return", {
                        ordersList: ordersList,
                      })

                    case 24:
                      _context6.prev = 24
                      _context6.t1 = _context6["catch"](17)
                      console.error(
                        "Unable to issue find command, ".concat(_context6.t1),
                      )

                    case 27:
                      return _context6.abrupt("return", {
                        ordersList: [],
                        totalNumOrders: 0,
                      })

                    case 28:
                    case "end":
                      return _context6.stop()
                  }
                }
              },
              _callee6,
              null,
              [
                [1, 13],
                [17, 24],
              ],
            )
          }),
        )

        function getCurrentOrders(_x5) {
          return _getCurrentOrders.apply(this, arguments)
        }

        return getCurrentOrders
      })(),
    },
    {
      key: "updateOrderById",
      value: (function() {
        var _updateOrderById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee7(
            id,
            orderInfo,
          ) {
            var result, response
            return _regenerator["default"].wrap(
              function _callee7$(_context7) {
                while (1) {
                  switch ((_context7.prev = _context7.next)) {
                    case 0:
                      _context7.prev = 0
                      _context7.next = 3
                      return orders.findOne({
                        _id: (0, _bson.ObjectId)(id),
                      })

                    case 3:
                      result = _context7.sent

                      if (!result) {
                        _context7.next = 11
                        break
                      }

                      _context7.next = 7
                      return orders.updateOne(
                        {
                          _id: (0, _bson.ObjectId)(id),
                        },
                        {
                          $set: {
                            customer_name: orderInfo.customer_name,
                            date: new Date(orderInfo.date),
                            positions: orderInfo.positions,
                          },
                        },
                      )

                    case 7:
                      response = _context7.sent

                      if (!response) {
                        _context7.next = 10
                        break
                      }

                      return _context7.abrupt("return", response)

                    case 10:
                      return _context7.abrupt("return", null)

                    case 11:
                      return _context7.abrupt("return", null)

                    case 14:
                      _context7.prev = 14
                      _context7.t0 = _context7["catch"](0)
                      console.error(
                        "Error occurred while updating article, ".concat(
                          _context7.t0,
                          ".",
                        ),
                      )
                      return _context7.abrupt("return", {
                        error: _context7.t0,
                      })

                    case 18:
                    case "end":
                      return _context7.stop()
                  }
                }
              },
              _callee7,
              null,
              [[0, 14]],
            )
          }),
        )

        function updateOrderById(_x6, _x7) {
          return _updateOrderById.apply(this, arguments)
        }

        return updateOrderById
      })(),
    },
    {
      key: "generateBuyList",
      value: (function() {
        var _generateBuyList = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee8(number) {
            var buyList,
              suggestedDate,
              ordersList,
              cursor,
              totalNumArticles,
              searchDate,
              articles,
              buyListArray,
              arr
            return _regenerator["default"].wrap(
              function _callee8$(_context8) {
                while (1) {
                  switch ((_context8.prev = _context8.next)) {
                    case 0:
                      //determine date & generate map
                      buyList = new Map()
                      suggestedDate = null
                      totalNumArticles = 0
                      _context8.prev = 3

                      if (!isNaN(number)) {
                        _context8.next = 6
                        break
                      }

                      throw new Error(
                        "".concat(
                          number,
                          " is not a number, please provide a number as argument",
                        ),
                      )

                    case 6:
                      if (number < 0) {
                        suggestedDate = (0, _dateFns.subDays)(
                          new Date(),
                          Math.abs(number),
                        )
                      }

                      if (number > 0) {
                        suggestedDate = (0, _dateFns.addDays)(
                          new Date(),
                          number,
                        )
                      }

                      searchDate =
                        suggestedDate === null
                          ? (0, _dateFns.startOfToday)()
                          : (0, _dateFns.startOfDay)(suggestedDate)
                      console.log("Searchin Orders for date: " + searchDate)
                      _context8.next = 12
                      return orders.find({
                        date: {
                          $gte:
                            suggestedDate === null
                              ? (0, _dateFns.startOfToday)()
                              : (0, _dateFns.startOfDay)(suggestedDate),
                          $lte:
                            suggestedDate === null
                              ? (0, _dateFns.endOfToday)()
                              : (0, _dateFns.endOfDay)(suggestedDate),
                        },
                      })

                    case 12:
                      cursor = _context8.sent
                      _context8.next = 15
                      return cursor.toArray()

                    case 15:
                      ordersList = _context8.sent
                      _context8.next = 18
                      return _ArticlesDAO["default"].getAllArticles()

                    case 18:
                      articles = _context8.sent
                      articles.forEach(function(element) {
                        return buyList.set(element.name, 0)
                      }) // console.log(ordersList)

                      ordersList.forEach(function(order) {
                        return order.positions.forEach(function(position) {
                          switch (position.name) {
                            case "Papr. Grün 5kg":
                              console.log(position.name, position.number)
                              buyList.set(
                                "Papr. Grün 5kg",
                                parseFloat(buyList.get("Papr. Grün 5kg"), 10) +
                                  parseFloat(position.number, 10) * 5,
                              )
                              break

                            case "Papr. Rot 5kg":
                              console.log(position.name, position.number)
                              buyList.set(
                                "Papr. Rot 5kg",
                                parseFloat(buyList.get("Papr. Rot 5kg"), 10) +
                                  parseFloat(position.number, 10) * 5,
                              )
                              break

                            case "Papr. Gelb 5kg":
                              console.log(position.name, position.number)
                              buyList.set(
                                "Papr. Gelb 5kg",
                                parseFloat(buyList.get("Papr. Gelb 5kg"), 10) +
                                  parseFloat(position.number, 10) * 5,
                              )
                              break

                            case "Papr. Mix 5kg":
                              buyList.set(
                                "Papr. Grün 5kg",
                                parseFloat(buyList.get("Papr. Grün 5kg"), 10) +
                                  5 / 3,
                              )
                              buyList.set(
                                "Papr. Rot 5kg",
                                parseFloat(buyList.get("Papr. Rot 5kg"), 10) +
                                  5 / 3,
                              )
                              buyList.set(
                                "Papr. Gelb 5kg",
                                parseFloat(buyList.get("Papr. Gelb 5kg"), 10) +
                                  5 / 3,
                              )
                              break

                            default:
                              buyList.set(
                                position.name,
                                parseFloat(buyList.get(position.name), 10) +
                                  parseFloat(position.number, 10),
                              )
                              break
                          }
                        })
                      }) // console.log(buyList.size)
                      // console.log(buyList.get("Tomaten 5kg"))

                      buyListArray = []
                      arr = Array.from(buyList)
                      arr.forEach(function(element) {
                        return buyListArray.push({
                          name: element[0],
                          number: element[1],
                        })
                      })
                      console.log(buyListArray)
                      buyListArray.forEach(function(element) {
                        return (totalNumArticles =
                          totalNumArticles + element.number)
                      })
                      return _context8.abrupt("return", {
                        buyListArray: buyListArray,
                        totalNumArticles: Math.round(totalNumArticles),
                      })

                    case 29:
                      _context8.prev = 29
                      _context8.t0 = _context8["catch"](3)
                      console.error(
                        "Unable to issue find command, ".concat(_context8.t0),
                      )
                      return _context8.abrupt("return", {
                        buyListArray: [],
                        totalNumArticles: 0,
                      })

                    case 33:
                    case "end":
                      return _context8.stop()
                  }
                }
              },
              _callee8,
              null,
              [[3, 29]],
            )
          }),
        )

        function generateBuyList(_x8) {
          return _generateBuyList.apply(this, arguments)
        }

        return generateBuyList
      })(),
    },
  ])
  return OrdersDAO
})()

exports["default"] = OrdersDAO
