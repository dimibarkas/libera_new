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
      let errors = {}
      if (!body) {
        errors.body = "You have to specify a body."
      }
      if (!body.customer_name) {
        errors.customer_name =
          "You have to specfiy a customer_name to create an order"
      }

      if (!body.date) {
        errors.date = "You have to specfiy a date to create an order"
      }

      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "INSERTION_FAILED",
          message: errors.name,
        })
        return
      }
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

  static async apiDeleteOrderById(req, res, next) {
    try {
      let id = req.params.id || {}
      let errors = {}
      if (id.length !== 24) {
        errors.id = "An error occured with the id"
      }
      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "DELETION_FAILED",
          message: errors,
        })
        return
      }
      const response = await OrdersDAO.deleteOrderById(id)

      if (response.deletedCount < 1) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "DELETION_FAILED",
          message: `No Order with id ${id} found.`,
        })
        return
      }

      res.status(constants.HTTP_STATUS_OK).json({
        code: "DELETION_SUCCED",
        message: `${response.deletedCount} Order with id ${id} deleted.`,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiUpdateOrderById(req, res, next) {
    try {
      let id = req.params.id || {}
      let body = req.body
      let errors = {}

      if (Object.keys(body).length === 0) {
        errors.name =
          "You have to specify a new or modified name for the article inside the body of your request."
      } else if (body && body.name?.length < 3) {
        errors.name = "The name of the article must be at least 3 characters."
      }
      if (id?.length !== 24) {
        errors.id = "An error occured with the id"
      }

      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "PATCH_FAILED",
          message: errors,
        })
        return
      }

      const { matchedCount, modifiedCount } = await OrdersDAO.updateOrderById(
        id,
        body,
      )

      if (matchedCount === 1 && modifiedCount === 0) {
        res.status(constants.HTTP_STATUS_NOT_MODIFIED).json({
          code: "ORDER_NOT_MODIFIED",
          message: "Order was found but not modified.",
        })
        return
      }

      if (!modifiedCount) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "PATCH_FAILED",
          message: `No order with id ${id} found.`,
        })
        return
      }

      res.status(constants.HTTP_STATUS_OK).json({
        code: "PATCH_SUCCED",
        message: `${modifiedCount} Object with id ${id} modified.`,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiGetCurrentOrders(req, res) {
    try {
      let number = req.params.number || {}
      let errors = {}
      if (!number) {
        errors.number = "No number for current provided"
      }
      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "WRONG_NUMBER",
          message: errors,
        })
        return
      }
      const { ordersList } = await OrdersDAO.getCurrentOrders(number)

      let response = {
        ordersList: ordersList,
      }
      res.json(response)
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiGenerateBuyList(req, res) {
    try {
      let number = req.params.number || {}
      let errors = {}
      if (!number) {
        errors.number = "No number for current provided"
      }
      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "WRONG_NUMBER",
          message: errors,
        })
        return
      }
      const {
        buyListArray,
        totalNumArticles,
      } = await OrdersDAO.generateBuyList(number)

      let response = {
        buyList: buyListArray,
        totalNumArticles: totalNumArticles,
      }
      res.json(response)
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }
}
