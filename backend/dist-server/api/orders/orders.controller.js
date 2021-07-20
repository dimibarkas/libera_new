

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
            var body, response
            return _regenerator["default"].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.prev = 0
                      body = req.body
                      _context3.next = 4
                      return _OrdersDAO["default"].insertOrder(body)

                    case 4:
                      response = _context3.sent

                      if (response) {
                        _context3.next = 8
                        break
                      }

                      res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).json({
                        code: "ORDER_ALREADY_EXISTS",
                        message: "Insertion failed, order with name "
                          .concat(body.customer_name, " and date ")
                          .concat(body.date, " already exist"),
                      })
                      return _context3.abrupt("return")

                    case 8:
                      res.status(_http.constants.HTTP_STATUS_CREATED).json({
                        code: "INSERTION_SUCCED",
                        message: "".concat(
                          response.insertedCount,
                          " order with name inserted.",
                        ),
                      })
                      _context3.next = 14
                      break

                    case 11:
                      _context3.prev = 11
                      _context3.t0 = _context3["catch"](0)
                      res
                        .status(
                          _http.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                        )
                        .json({
                          error: _context3.t0,
                        })

                    case 14:
                    case "end":
                      return _context3.stop()
                  }
                }
              },
              _callee3,
              null,
              [[0, 11]],
            )
          }),
        )

        function apiInsertOrder(_x7, _x8, _x9) {
          return _apiInsertOrder.apply(this, arguments)
        }

        return apiInsertOrder
      })(),
    },
  ])
  return OrdersController
})()

exports["default"] = OrdersController
