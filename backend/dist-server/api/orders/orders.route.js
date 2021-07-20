

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = void 0

var _express = require("express")

var _orders = _interopRequireDefault(require("./orders.controller"))

var router = new _express.Router()
router.route("/").get(_orders["default"].apiGetOrders)
router.route("/id/:id").get(_orders["default"].apiGetOrderById)
router.route("/").post(_orders["default"].apiInsertOrder) //router.route("/current:number").get(OrdersController.apiCurrentOrders)

var _default = router
exports["default"] = _default
