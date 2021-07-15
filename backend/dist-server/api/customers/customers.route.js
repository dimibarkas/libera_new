

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = void 0

var _express = require("express")

var _customers = _interopRequireDefault(require("./customers.controller"))

var router = new _express.Router()
router.route("/").get(_customers["default"].apiGetCustomers)
router.route("/").post(_customers["default"].apiInsertCustomer)
router.route("/id/:id").get(_customers["default"].apiGetCustomerById)
router.route("/id/:id").patch(_customers["default"].apiUpdateCustomerById)
router.route("/id/:id")["delete"](_customers["default"].apiDeleteCustomerById)
var _default = router
exports["default"] = _default
