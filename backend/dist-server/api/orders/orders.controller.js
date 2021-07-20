

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

var _OrdersDAO = _interopRequireDefault(require("../../dao/OrdersDAO"))

var _http = require("http2")

var OrdersController = /*#__PURE__*/ (function() {
  function OrdersController() {
    ;(0, _classCallCheck2["default"])(this, OrdersController)
  }

  ;(0, _createClass2["default"])(OrdersController, null, [
    {
      key: "apiGetOrders",
      value: (function() {
        var _apiGetOrders = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee(
            req,
            res,
            next,
          ) {
            var ORDERS_PER_PAGE,
              _yield$OrdersDAO$getO,
              ordersList,
              totalNumOrders,
              response

            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    ORDERS_PER_PAGE = 20
                    _context.next = 3
                    return _OrdersDAO["default"].getOrders()

                  case 3:
                    _yield$OrdersDAO$getO = _context.sent
                    ordersList = _yield$OrdersDAO$getO.ordersList
                    totalNumOrders = _yield$OrdersDAO$getO.totalNumOrders
                    response = {
                      orders: ordersList,
                      page: 0,
                      filters: {},
                      entries_per_page: ORDERS_PER_PAGE,
                      total_results: totalNumOrders,
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

        function apiGetOrders(_x, _x2, _x3) {
          return _apiGetOrders.apply(this, arguments)
        }

        return apiGetOrders
      })(),
    },
    {
      key: "apiGetOrderById",
      value: (function() {
        var _apiGetOrderById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee2(
            req,
            res,
            next,
          ) {
            var id, order
            return _regenerator["default"].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      _context2.prev = 0
                      id = req.params.id || {}
                      _context2.next = 4
                      return _OrdersDAO["default"].getOrderById(id)

                    case 4:
                      order = _context2.sent

                      if (order) {
                        _context2.next = 8
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_NOT_FOUND).json({
                        code: "ORDER_NOT_FOUND",
                        message: "Order with id ".concat(
                          id,
                          " could not be found.",
                        ),
                      })
                      return _context2.abrupt("return")

                    case 8:
                      if (!order.error) {
                        _context2.next = 11
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "ID_INCORRECT",
                        message: "Entered id ".concat(id, " was incorrect"),
                      })
                      return _context2.abrupt("return")

                    case 11:
                      res.status(_http.constants.HTTP_STATUS_OK).json({
                        _id: order._id,
                        customer_name: order.customer_name,
                        date: order.date,
                        positions: order.positions,
                      })
                      _context2.next = 17
                      break

                    case 14:
                      _context2.prev = 14
                      _context2.t0 = _context2["catch"](0)
                      res
                        .status(
                          _http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                        )
                        .json({
                          error: _context2.t0,
                        })

                    case 17:
                    case "end":
                      return _context2.stop()
                  }
                }
              },
              _callee2,
              null,
              [[0, 14]],
            )
          }),
        )

        function apiGetOrderById(_x4, _x5, _x6) {
          return _apiGetOrderById.apply(this, arguments)
        }

        return apiGetOrderById
      })(),
    },
    {
      key: "apiInsertOrder",
      value: (function() {
        var _apiInsertOrder = (0, _asyncToGenerator2["default"])(
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

                      if (!body) {
                        errors.body = "You have to specify a body."
                      }

                      if (!body.customer_name) {
                        errors.customer_name =
                          "You have to specfiy a customer_name to create an order"
                      }

                      if (!body.date) {
                        errors.date =
                          "You have to specfiy a date to create an order"
                      }

                      if (!(Object.keys(errors).length > 0)) {
                        _context3.next = 9
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "INSERTION_FAILED",
                        message: errors.name,
                      })
                      return _context3.abrupt("return")

                    case 9:
                      _context3.next = 11
                      return _OrdersDAO["default"].insertOrder(body)

                    case 11:
                      response = _context3.sent

                      if (response) {
                        _context3.next = 15
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "ORDER_ALREADY_EXISTS",
                        message: "Insertion failed, order with name "
                          .concat(body.customer_name, " and date ")
                          .concat(body.date, " already exist"),
                      })
                      return _context3.abrupt("return")

                    case 15:
                      res.status(_http.constants.HTTP_STATUS_CREATED).json({
                        code: "INSERTION_SUCCED",
                        message: "".concat(
                          response.insertedCount,
                          " order with name inserted.",
                        ),
                      })
                      _context3.next = 21
                      break

                    case 18:
                      _context3.prev = 18
                      _context3.t0 = _context3["catch"](0)
                      res
                        .status(
                          _http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                        )
                        .json({
                          error: _context3.t0,
                        })

                    case 21:
                    case "end":
                      return _context3.stop()
                  }
                }
              },
              _callee3,
              null,
              [[0, 18]],
            )
          }),
        )

        function apiInsertOrder(_x7, _x8, _x9) {
          return _apiInsertOrder.apply(this, arguments)
        }

        return apiInsertOrder
      })(),
    },
    {
      key: "apiDeleteOrderById",
      value: (function() {
        var _apiDeleteOrderById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee4(
            req,
            res,
            next,
          ) {
            var id, errors, response
            return _regenerator["default"].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      _context4.prev = 0
                      id = req.params.id || {}
                      errors = {}

                      if (id.length !== 24) {
                        errors.id = "An error occured with the id"
                      }

                      if (!(Object.keys(errors).length > 0)) {
                        _context4.next = 7
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "DELETION_FAILED",
                        message: errors,
                      })
                      return _context4.abrupt("return")

                    case 7:
                      _context4.next = 9
                      return _OrdersDAO["default"].deleteOrderById(id)

                    case 9:
                      response = _context4.sent

                      if (!(response.deletedCount < 1)) {
                        _context4.next = 13
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "DELETION_FAILED",
                        message: "No Order with id ".concat(id, " found."),
                      })
                      return _context4.abrupt("return")

                    case 13:
                      res.status(_http.constants.HTTP_STATUS_OK).json({
                        code: "DELETION_SUCCED",
                        message: ""
                          .concat(response.deletedCount, " Order with id ")
                          .concat(id, " deleted."),
                      })
                      _context4.next = 19
                      break

                    case 16:
                      _context4.prev = 16
                      _context4.t0 = _context4["catch"](0)
                      res
                        .status(
                          _http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                        )
                        .json({
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
              [[0, 16]],
            )
          }),
        )

        function apiDeleteOrderById(_x10, _x11, _x12) {
          return _apiDeleteOrderById.apply(this, arguments)
        }

        return apiDeleteOrderById
      })(),
    },
    {
      key: "apiUpdateOrderById",
      value: (function() {
        var _apiUpdateOrderById = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee5(
            req,
            res,
            next,
          ) {
            var _body$name,
              id,
              body,
              errors,
              _yield$OrdersDAO$upda,
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
                      return _OrdersDAO["default"].updateOrderById(id, body)

                    case 11:
                      _yield$OrdersDAO$upda = _context5.sent
                      matchedCount = _yield$OrdersDAO$upda.matchedCount
                      modifiedCount = _yield$OrdersDAO$upda.modifiedCount

                      if (!(matchedCount === 1 && modifiedCount === 0)) {
                        _context5.next = 17
                        break
                      }

                      res
                        .status(_http.constants.HTTP_STATUS_NOT_MODIFIED)
                        .json({
                          code: "ORDER_NOT_MODIFIED",
                          message: "Order was found but not modified.",
                        })
                      return _context5.abrupt("return")

                    case 17:
                      if (modifiedCount) {
                        _context5.next = 20
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "PATCH_FAILED",
                        message: "No order with id ".concat(id, " found."),
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

        function apiUpdateOrderById(_x13, _x14, _x15) {
          return _apiUpdateOrderById.apply(this, arguments)
        }

        return apiUpdateOrderById
      })(),
    },
    {
      key: "apiGetCurrentOrders",
      value: (function() {
        var _apiGetCurrentOrders = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee6(
            req,
            res,
          ) {
            var number, errors, _yield$OrdersDAO$getC, ordersList, response

            return _regenerator["default"].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      _context6.prev = 0
                      number = req.params.number || {}
                      errors = {}

                      if (!number) {
                        errors.number = "No number for current provided"
                      }

                      if (!(Object.keys(errors).length > 0)) {
                        _context6.next = 7
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "WRONG_NUMBER",
                        message: errors,
                      })
                      return _context6.abrupt("return")

                    case 7:
                      _context6.next = 9
                      return _OrdersDAO["default"].getCurrentOrders(number)

                    case 9:
                      _yield$OrdersDAO$getC = _context6.sent
                      ordersList = _yield$OrdersDAO$getC.ordersList
                      response = {
                        ordersList: ordersList,
                      }
                      res.json(response)
                      _context6.next = 18
                      break

                    case 15:
                      _context6.prev = 15
                      _context6.t0 = _context6["catch"](0)
                      res
                        .status(
                          _http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                        )
                        .json({
                          error: _context6.t0,
                        })

                    case 18:
                    case "end":
                      return _context6.stop()
                  }
                }
              },
              _callee6,
              null,
              [[0, 15]],
            )
          }),
        )

        function apiGetCurrentOrders(_x16, _x17) {
          return _apiGetCurrentOrders.apply(this, arguments)
        }

        return apiGetCurrentOrders
      })(),
    },
  ])
  return OrdersController
})()

exports["default"] = OrdersController
