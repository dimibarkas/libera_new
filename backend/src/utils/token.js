import jwt from "jsonwebtoken"

export function removeBearerPrefix(headerString) {
  return headerString.replace("Bearer ", "")
}

export function isLoggedIn(token, publicKey) {
  try {
    jwt.verify(removeBearerPrefix(token), publicKey, {
      algorithms: "ES512",
      subject: "access",
    })
  } catch (err) {
    return false
  }
  return true
}

export function parseToken(token) {
  return jwt.decode(removeBearerPrefix(token))
}
