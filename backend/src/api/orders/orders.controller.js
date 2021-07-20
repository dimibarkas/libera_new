import OrdersDAO from "../../dao/OrdersDAO"
import { constants } from "http2"

export default class OrdersController {
  static async apiGetOrders(req, res, next) {
    const ORDERS_PER_PAGE = 20
    const { ordersList, totalNumOrders } = await OrdersDAO.getOrders()
    let response = {
      orders: ordersList,
      page: 0,
      filters: {},
      entries_per_page: ORDERS_PER_PAGE,
      total_results: totalNumOrders,
    }
    res.json(response)
  }

  static async apiGetOrderById(req, res, next) {
    try {
      let id = req.params.id || {}
      let order = await OrdersDAO.getOrderById(id)
      if (!order) {
        res.status(constants.HTTP_STATUS_NOT_FOUND).json({
          code: "ORDER_NOT_FOUND",
          message: `Order with id ${id} could not be found.`,
        })
        return
      }

      if (order.error) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "ID_INCORRECT",
          message: `Entered id ${id} was incorrect`,
        })
        return
      }

      res.status(constants.HTTP_STATUS_OK).json({
        _id: order._id,
        customer_name: order.customer_name,
        date: order.date,
        positions: order.positions,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiInsertOrder(req, res, next) {
    try {
      const body = req.body
      const response = await OrdersDAO.insertOrder(body)
      if (!response) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "ORDER_ALREADY_EXISTS",
          message: `Insertion failed, order with name ${body.customer_name} and date ${body.date} already exist`,
        })
        return
      }
      res.status(constants.HTTP_STATUS_CREATED).json({
        code: "INSERTION_SUCCED",
        message: `${response.insertedCount} order with name inserted.`,
      })
    } catch (e) {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: e })
    }
  }
}
