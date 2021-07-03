

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"))

var _asyncToGenerator2 = _interopRequireDefault(
  require("@babel/runtime/helpers/asyncToGenerator"),
)

var _server = _interopRequireDefault(require("./server.js"))

var _mongodb = require("mongodb")

var _UsersDAO = _interopRequireDefault(require("./dao/UsersDAO.js"))

var _ArticlesDAO = _interopRequireDefault(require("./dao/ArticlesDAO.js"))

var _CustomersDAO = _interopRequireDefault(require("./dao/CustomersDAO"))

var _OrdersDAO = _interopRequireDefault(require("./dao/OrdersDAO"))

var port = process.env.PORT || 8080

_mongodb.MongoClient.connect(process.env.LIBERA_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  ["catch"](function(err) {
    console.error(err.stack)
    process.exit(1)
  })
  .then(
    /*#__PURE__*/ (function() {
      var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/ _regenerator["default"].mark(function _callee(client) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2
                  return _UsersDAO["default"].injectDB(client)

                case 2:
                  _context.next = 4
                  return _ArticlesDAO["default"].injectDB(client)

                case 4:
                  _context.next = 6
                  return _CustomersDAO["default"].injectDB(client)

                case 6:
                  _context.next = 8
                  return _OrdersDAO["default"].injectDB(client)

                case 8:
                  _server["default"].listen(port, function() {
                    console.log(
                      "Libera backend listening on Port ".concat(port),
                    )
                  })

                case 9:
                case "end":
                  return _context.stop()
              }
            }
          }, _callee)
        }),
      )

      return function(_x) {
        return _ref.apply(this, arguments)
      }
    })(),
  )
