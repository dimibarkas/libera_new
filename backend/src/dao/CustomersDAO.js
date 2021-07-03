let customers

export default class CustomersDAO {
  static async injectDB(conn) {
    if (customers) {
      return
    }
    try {
      customers = await conn.db(process.env.LIBERA_NS).collection("customers")
      this.customers = customers //this is only for testing
    } catch (e) {
      console.error(`Unable to establish a connection in UsersDAO: ${e}`)
    }
  }

  static async getCustomers() {
    return { customerList: [], totalNumCustomers: 0 }
  }
}
