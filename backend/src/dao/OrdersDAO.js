let orders
const DEFAULT_SORT = []

export default class OrdersDAO {
  static async injectDB(conn) {
    if (orders) {
      return
    }
    try {
      orders = await conn.db(process.env.LIBERA_NS).collection("orders")
      this.orders = orders //this is only for testing
    } catch (e) {
      console.error(`Unable to establish a connection in UsersDAO: ${e}`)
    }
  }
  /**
   *
   * @param {*} param0
   * @returns
   */
  static async getOrders({
    // setting the default parameters for the getArticles method
    filters = null,
    page = 0,
    ordersPerPage = 20,
  } = {}) {
    let queryParams = {}
    if (filters) {
      if ("text" in filters) {
        queryParams = this.textSearch(filters["text"])
      }
    }

    let { query = {}, project = {}, sort = DEFAULT_SORT } = queryParams
    let cursor
    try {
      cursor = await orders
        .find(query)
        .project(project)
        .sort(sort)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { ordersList: [], totalNumOrders: 0 }
    }

    const displayCursor = cursor.limit(ordersPerPage).skip(ordersPerPage * page)

    try {
      const ordersList = await displayCursor.toArray()
      const totalNumOrders = page === 0 ? await orders.countDocuments(query) : 0

      return { ordersList, totalNumOrders }
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
    }
    return { ordersList: [], totalNumOrders: 0 }
  }
}
