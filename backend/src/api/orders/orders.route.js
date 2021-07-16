import { Router } from "express"
import OrdersController from "./orders.controller"

const router = new Router()

router.route("/").get(OrdersController.apiGetOrders)

export default router
