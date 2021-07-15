import { Router } from "express"
import CustomersController from "./customers.controller"

const router = new Router()

router.route("/").get(CustomersController.apiGetCustomers)
router.route("/").post(CustomersController.apiInsertCustomer)
router.route("/id/:id").get(CustomersController.apiGetCustomerById)
router.route("/id/:id").patch(CustomersController.apiUpdateCustomerById)
router.route("/id/:id").delete(CustomersController.apiDeleteCustomerById)

export default router
