import { Router } from "express"
import UserController from "./users.controller"

const router = new Router()

router.route("/register").post(UserController.handleRegister)
router.route("/login").post(UserController.handleLogin)

export default router
