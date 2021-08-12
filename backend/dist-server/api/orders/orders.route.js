

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = void 0

var _express = require("express")

var _orders = _interopRequireDefault(require("./orders.controller"))

var router = new _express.Router()
router.route("/").get(_orders["default"].apiGetOrders)
router.route("/").post(_orders["default"].apiInsertOrder)
router.route("/id/:id").get(_orders["default"].apiGetOrderById)
router.route("/id/:id").patch(_orders["default"].apiUpdateOrderById)
router.route("/id/:id")["delete"](_orders["default"].apiDeleteOrderById)
router.route("/current/:number").get(_orders["default"].apiGetCurrentOrders)
router.route("/buylist/:number").get(_orders["default"].apiGenerateBuyList)
router
  .route("/deliverynotes/:number")
  .get(_orders["default"].apiGenerateDeliveryNotes)
var _default = router
exports["default"] = _default
