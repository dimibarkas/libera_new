let orders

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
}
