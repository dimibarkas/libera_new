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

var _crypto = _interopRequireDefault(require("crypto"))

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"))

var _uuid = require("uuid")

var _UsersDAO = _interopRequireDefault(require("../../dao/UsersDAO"))

var _http = require("http2")

var _fs = _interopRequireDefault(require("fs"))

var saltLength = 16
var iterations = 50000
var keyLength = 128
var digest = "sha512"
var config = {}

if (!process.env.JWT_PRIVATE_KEY) {
  config.jwtPrivateKey = _fs["default"].readFileSync("private.pem")
} else {
  config.jwtPrivateKey = Buffer.from(process.env.JWT_PRIVATE_KEY, "base64")
}

var UserController = /*#__PURE__*/ (function() {
  function UserController() {
    ;(0, _classCallCheck2["default"])(this, UserController)
  }

  ;(0, _createClass2["default"])(UserController, null, [
    {
      key: "handleRegister",
      value: (function() {
        var _handleRegister = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee(
            req,
            res,
          ) {
            var accountExists, salt, hashed, encoded, userInfo, account
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    if (
                      !(
                        !req.body.name ||
                        !req.body.username ||
                        !req.body.password
                      )
                    ) {
                      _context.next = 3
                      break
                    }

                    res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).send({
                      code: "EMPTY_FIELDS",
                      message: "please specify name, username and password",
                    })
                    return _context.abrupt("return")

                  case 3:
                    if (!(req.body.password.length < 6)) {
                      _context.next = 6
                      break
                    }

                    res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).send({
                      code: "SHORT_PASSWORD",
                      min_length: 6,
                      message:
                        "password needs to be at least 6 characters long",
                    })
                    return _context.abrupt("return")

                  case 6:
                    _context.next = 8
                    return _UsersDAO["default"].findByUsername(
                      req.body.username,
                    )

                  case 8:
                    accountExists = _context.sent

                    if (!accountExists) {
                      _context.next = 12
                      break
                    }

                    res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).send({
                      code: "USERNAME_IN_USE",
                      message: "username is already in use",
                    })
                    return _context.abrupt("return")

                  case 12:
                    //Hashing the password secure
                    salt = Buffer.from(
                      _crypto["default"].randomBytes(saltLength),
                    )
                    hashed = _crypto["default"].pbkdf2Sync(
                      req.body.password,
                      salt.toString("hex"),
                      iterations,
                      keyLength,
                      digest,
                    )
                    encoded = ""
                      .concat(digest, "$")
                      .concat(iterations, "$")
                      .concat(keyLength, "$")
                      .concat(salt.toString("hex"), "$")
                      .concat(hashed.toString("hex"))
                    userInfo = {
                      name: req.body.name,
                      username: req.body.username,
                      password: encoded,
                    } //Persist account to the database

                    _context.next = 18
                    return _UsersDAO["default"].createAccount(userInfo)

                  case 18:
                    account = _context.sent

                    if (!(account.insertedCount !== 1)) {
                      _context.next = 22
                      break
                    }

                    res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).send({
                      code: "USERNAME_IN_USE",
                      message: "username is already in use",
                    })
                    return _context.abrupt("return")

                  case 22:
                    res.status(_http.constants.HTTP_STATUS_CREATED).json({
                      message: "account for user ".concat(
                        req.body.username,
                        " created",
                      ),
                    })

                  case 23:
                  case "end":
                    return _context.stop()
                }
              }
            }, _callee)
          }),
        )

        function handleRegister(_x, _x2) {
          return _handleRegister.apply(this, arguments)
        }

        return handleRegister
      })(),
    },
    {
      key: "handleLogin",
      value: (function() {
        var _handleLogin = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/ _regenerator["default"].mark(function _callee2(
            req,
            res,
          ) {
            var account,
              parts,
              digest,
              iterations,
              keyLength,
              salt,
              realPassword,
              inputPassword,
              tokenId,
              now,
              accessToken,
              refreshToken
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    if (!(!req.body.username || !req.body.password)) {
                      _context2.next = 3
                      break
                    }

                    res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).send({
                      code: "EMPTY_FIELDS",
                      message: "please specify username and passwor",
                    })
                    return _context2.abrupt("return")

                  case 3:
                    _context2.next = 5
                    return _UsersDAO["default"].findByUsername(
                      req.body.username,
                    )

                  case 5:
                    account = _context2.sent

                    if (account) {
                      _context2.next = 9
                      break
                    }

                    res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).send({
                      code: "LOGIN_FAILED",
                      message: "mail address or password wrong",
                    })
                    return _context2.abrupt("return")

                  case 9:
                    parts = account.password.split("$")
                    digest = parts[0]
                    iterations = parts[1]
                    keyLength = parts[2]
                    salt = parts[3]
                    realPassword = parts[4]
                    inputPassword = _crypto["default"].pbkdf2Sync(
                      req.body.password,
                      salt,
                      parseInt(iterations, 10),
                      parseInt(keyLength, 10),
                      digest,
                    )

                    if (!(realPassword !== inputPassword.toString("hex"))) {
                      _context2.next = 19
                      break
                    }

                    res.status(_http.constants.HTTP_STATUS_BAD_REQUEST).send({
                      code: "LOGIN_FAILED",
                      message: "mail address or password wrong",
                    })
                    return _context2.abrupt("return")

                  case 19:
                    tokenId = (0, _uuid.v4)()
                    now = Math.floor(new Date().getTime() / 1000)
                    accessToken = {
                      jti: tokenId,
                      sub: "access",
                      iat: now,
                      exp: now + 60 * 60 * 24,
                      // 1 day expiry time
                      user_id: account._id,
                      name: account.name,
                      username: account.username,
                    }
                    refreshToken = {
                      jti: tokenId,
                      sub: "refresh",
                      iat: now,
                      exp: now + 60 * 60 * 24 * 30, // 30 days expiry time
                    }
                    res.status(_http.constants.HTTP_STATUS_OK).send({
                      code: "LOGIN_SUCEEDED",
                      access_token: _jsonwebtoken["default"].sign(
                        accessToken,
                        config.jwtPrivateKey,
                        {
                          algorithm: "ES512",
                        },
                      ),
                      refresh_token: _jsonwebtoken["default"].sign(
                        refreshToken,
                        config.jwtPrivateKey,
                        {
                          algorithm: "ES512",
                        },
                      ),
                    })

                  case 24:
                  case "end":
                    return _context2.stop()
                }
              }
            }, _callee2)
          }),
        )

        function handleLogin(_x3, _x4) {
          return _handleLogin.apply(this, arguments)
        }

        return handleLogin
      })(),
    },
  ])
  return UserController
})()

exports["default"] = UserController
