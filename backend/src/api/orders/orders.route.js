import { Router } from "express"
import OrdersController from "./orders.controller"

const router = new Router()

router.route("/").get(OrdersController.apiGetOrders)
router.route("/id/:id").get(OrdersController.apiGetOrderById)
router.route("/").post(OrdersController.apiInsertOrder)

//router.route("/current:number").get(OrdersController.apiCurrentOrders)

export default router
