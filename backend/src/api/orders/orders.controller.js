import OrdersDAO from "../../dao/OrdersDAO"

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
}
