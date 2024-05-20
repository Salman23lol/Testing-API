const express = require("express")
const { register, login } = require("../Controllers/authController")
const authRouter = express()

authRouter.post("/signup", register)
authRouter.post("/login", login)

module.exports = {
  authRouter
}