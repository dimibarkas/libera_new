import { Router } from "express"
import OrdersController from "./orders.controller"

const router = new Router()

router.route("/").get(OrdersController.apiGetOrders)
router.route("/id/:id").get(OrdersController.apiGetOrderById)

export default router
