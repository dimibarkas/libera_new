import crypto from "crypto"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import UsersDAO from "../../dao/UsersDAO"
import { constants } from "http2"
import fs from "fs"

const saltLength = 16
const iterations = 50000
const keyLength = 128
const digest = "sha512"

const config = {}

if (!process.env.JWT_PRIVATE_KEY) {
  config.jwtPrivateKey = fs.readFileSync("private.pem")
} else {
  config.jwtPrivateKey = Buffer.from(process.env.JWT_PRIVATE_KEY, "base64")
}

export default class UserController {
  static async handleRegister(req, res) {
    if (!req.body.name || !req.body.username || !req.body.password) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
        code: "EMPTY_FIELDS",
        message: "please specify name, username and password",
      })
      return
    }

    if (req.body.password.length < 6) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
        code: "SHORT_PASSWORD",
        min_length: 6,
        message: "password needs to be at least 6 characters long",
      })
      return
    }

    const accountExists = await UsersDAO.findByUsername(req.body.username)
    if (accountExists) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
        code: "USERNAME_IN_USE",
        message: "username is already in use",
      })
      return
    }

    //Hashing the password secure
    const salt = Buffer.from(crypto.randomBytes(saltLength))
    const hashed = crypto.pbkdf2Sync(
      req.body.password,
      salt.toString("hex"),
      iterations,
      keyLength,
      digest,
    )
    const encoded = `${digest}$${iterations}$${keyLength}$${salt.toString(
      "hex",
    )}$${hashed.toString("hex")}`

    const userInfo = {
      name: req.body.name,
      username: req.body.username,
      password: encoded,
    }

    //Persist account to the database
    const account = await UsersDAO.createAccount(userInfo)
    if (account.insertedCount !== 1) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
        code: "USERNAME_IN_USE",
        message: "username is already in use",
      })
      return
    }

    res.status(constants.HTTP_STATUS_CREATED).json({
      message: `account for user ${req.body.username} created`,
    })
  }

  static async handleLogin(req, res) {
    if (!req.body.username || !req.body.password) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
        code: "EMPTY_FIELDS",
        message: "please specify username and passwor",
      })
      return
    }

    const account = await UsersDAO.findByUsername(req.body.username)
    if (!account) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
        code: "LOGIN_FAILED",
        message: "mail address or password wrong",
      })
      return
    }

    const parts = account.password.split("$")
    const digest = parts[0]
    const iterations = parts[1]
    const keyLength = parts[2]
    const salt = parts[3]
    const realPassword = parts[4]
    const inputPassword = crypto.pbkdf2Sync(
      req.body.password,
      salt,
      parseInt(iterations, 10),
      parseInt(keyLength, 10),
      digest,
    )

    if (realPassword !== inputPassword.toString("hex")) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
        code: "LOGIN_FAILED",
        message: "mail address or password wrong",
      })
      return
    }

    const tokenId = uuidv4()
    const now = Math.floor(new Date().getTime() / 1000)

    const accessToken = {
      jti: tokenId,
      sub: "access",
      iat: now,
      exp: now + 60 * 60 * 24, // 1 day expiry time
      user_id: account._id,
      name: account.name,
      username: account.username,
    }

    const refreshToken = {
      jti: tokenId,
      sub: "refresh",
      iat: now,
      exp: now + 60 * 60 * 24 * 30, // 30 days expiry time
    }

    res.status(constants.HTTP_STATUS_OK).send({
      code: "LOGIN_SUCEEDED",
      access_token: jwt.sign(accessToken, config.jwtPrivateKey, {
        algorithm: "ES512",
      }),
      refresh_token: jwt.sign(refreshToken, config.jwtPrivateKey, {
        algorithm: "ES512",
      }),
    })
  }
}
