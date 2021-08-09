import { ObjectId } from "bson"

let customers
const DEFAULT_SORT = []

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

  /**
   *
   * @param {*} param0
   * @returns
   */
  static async getCustomers({
    // setting the default parameters for the getArticles method
    filters = null,
    page = 0,
    customersPerPage = 20,
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
      cursor = await customers
        .find(query)
        .project(project)
        .sort(sort)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { customersList: [], totalNumCustomers: 0 }
    }

    const displayCursor = cursor
      .limit(customersPerPage)
      .skip(customersPerPage * page)

    try {
      const customerList = await displayCursor.toArray()
      const totalNumCustomers = await customers.countDocuments(query)

      return { customerList, totalNumCustomers }
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
    }
    return { customerList: [], totalNumCustomers: 0 }
  }

  static async insertCustomer(customerInfo) {
    try {
      const result = await customers.findOne({ name: customerInfo.name })
      if (!result) {
        const { insertedCount, insertedId } = await customers.insertOne({
          name: customerInfo.name,
          address: {
            street: customerInfo.address.street,
            nr: customerInfo.address.nr,
            zipcode: customerInfo.address.zipcode,
            city: customerInfo.address.city,
            country: customerInfo.address.country,
          },
          phone: customerInfo.phone,
        })
        let response = { insertedCount, insertedId }
        return response
      }
      return null
    } catch (error) {
      console.error(`Error occurred while adding a new article, ${error}.`)
      return { error: error }
    }
  }

  static async getCustomerById(id) {
    try {
      const result = await customers.findOne({ _id: ObjectId(id) })
      if (!result) {
        return null
      }
      return result
    } catch (error) {
      console.error(`Error occurred while searching customer, ${error}.`)
      return { error: error }
    }
  }

  static async updateCustomerById(id, customerInfo) {
    try {
      const result = await this.getCustomerById(id)
      if (result) {
        const response = await customers.updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              name: customerInfo.name,
              address: customerInfo.address,
              phone: customerInfo.phone,
            },
          },
        )
        if (response) {
          return response
        }
        return null
      }
      return null
    } catch (error) {
      console.error(`Error occurred while updating article, ${error}.`)
      return { error: error }
    }
  }

  static async deleteCustomerById(id) {
    try {
      const response = await customers.deleteOne({ _id: ObjectId(id) })
      if (response) {
        return response
      }
      return null
    } catch (error) {
      console.error(`Error occurred while deleting the article, ${error}.`)
      return { error: error }
    }
  }

  static async getAllCustomers() {
    try {
      const response = await customers
        .find({})
        .project({ _id: 0, address: 0, phone: 0 })
        .toArray()
      if (response) {
        return response
      }
      return null
    } catch (error) {
      console.error(`Error occurred while retrieving customers, ${error}.`)
      return { error: error }
    }
  }
}
