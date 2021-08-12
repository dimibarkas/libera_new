import { Router } from "express"
import OrdersController from "./orders.controller"

const router = new Router()

router.route("/").get(OrdersController.apiGetOrders)
router.route("/").post(OrdersController.apiInsertOrder)
router.route("/id/:id").get(OrdersController.apiGetOrderById)
router.route("/id/:id").patch(OrdersController.apiUpdateOrderById)
router.route("/id/:id").delete(OrdersController.apiDeleteOrderById)
router.route("/current/:number").get(OrdersController.apiGetCurrentOrders)
router.route("/buylist/:number").get(OrdersController.apiGenerateBuyList)
router
  .route("/deliverynotes/:number")
  .get(OrdersController.apiGenerateDeliveryNotes)

export default router
