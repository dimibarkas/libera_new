

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
  ])
  return OrdersController
})()

exports["default"] = OrdersController
