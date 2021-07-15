

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = void 0

var _express = _interopRequireDefault(require("express"))

var _bodyParser = _interopRequireDefault(require("body-parser"))

var _cors = _interopRequireDefault(require("cors"))

var _morgan = _interopRequireDefault(require("morgan"))

var _articles = _interopRequireDefault(require("./api/articles/articles.route"))

var _users = _interopRequireDefault(require("./api/users/users.route"))

var _customers = _interopRequireDefault(
  require("./api/customers/customers.route"),
)

var _path = _interopRequireDefault(require("path"))

var app = (0, _express["default"])()
app.use((0, _cors["default"])())
process.env.NODE_ENV !== "production" && app.use((0, _morgan["default"])("dev"))
app.use(_bodyParser["default"].json())
app.use(
  _bodyParser["default"].urlencoded({
    extended: true,
  }),
) //JWT-Configuration
//Register api routes

app.use("/api/articles", _articles["default"])
app.use("/api/users", _users["default"])
app.use("/api/customers", _customers["default"])
app.use("/", _express["default"]["static"]("public"))
app.use("*", function(req, res) {
  return res.sendFile(
    _path["default"].join(_path["default"].resolve(), "public/index.html"),
  )
})
var _default = app
exports["default"] = _default
