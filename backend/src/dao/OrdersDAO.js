import { ObjectId } from "bson"
import {
  startOfToday,
  endOfToday,
  subDays,
  startOfDay,
  endOfDay,
  addDays,
} from "date-fns"
import generateBuylistPDF from "../report/generate-buylist"
import generateDeliveryNotePDF from "../report/generate-delivery-note"

import ArticlesDAO from "./ArticlesDAO"

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
      console.error(`Unable to establish a connection in OrderssDAO: ${e}`)
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

  static async getOrderById(id) {
    try {
      const result = await orders.findOne({ _id: ObjectId(id) })
      if (!result) {
        return null
      }
      return result
    } catch (error) {
      console.error(`Error occurred while searching article, ${error}.`)
      return { error: error }
    }
  }

  static async insertOrder(orderData) {
    try {
      const result = await orders.findOne({
        $and: [
          { customer_name: orderData.customer_name },
          { date: orderData.date },
        ],
      })
      if (!result) {
        const { insertedCount, insertedId } = await orders.insertOne({
          customer_name: orderData.customer_name,
          date: new Date(orderData.date),
          positions: orderData.positions,
        })
        let response = { insertedCount, insertedId }
        return response
      }
      return null
    } catch (error) {
      console.error(`
        Error occurred while adding a new order for
        ${orderData.customer_name} at ${orderData.date} , ${error}.`)
      return { error: error }
    }
  }

  static async deleteOrderById(id) {
    try {
      const response = await orders.deleteOne({ _id: ObjectId(id) })
      if (response) {
        return response
      }
      return null
    } catch (error) {
      console.error(`Error occurred while deleting the article, ${error}.`)
      return { error: error }
    }
  }

  static async getCurrentOrders(number) {
    let suggestedDate = null
    let cursor
    try {
      if (isNaN(number)) {
        throw new Error(
          `${number} is not a number, please provide a number as argument`,
        )
      }
      if (number < 0) {
        suggestedDate = subDays(new Date(), Math.abs(number))
      }
      if (number > 0) {
        suggestedDate = addDays(new Date(), number)
      }
      const searchDate =
        suggestedDate === null ? startOfToday() : startOfDay(suggestedDate)
      console.log("Searching orders for date: " + searchDate)
      cursor = await orders.find({
        date: {
          $gte:
            suggestedDate === null ? startOfToday() : startOfDay(suggestedDate),
          $lte: suggestedDate === null ? endOfToday() : endOfDay(suggestedDate),
        },
      })
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`)
      return { ordersList: [], totalNumOrders: 0 }
    }

    try {
      const ordersList = await cursor.toArray()
      return { ordersList }
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`)
    }
    return { ordersList: [], totalNumOrders: 0 }
  }

  static async updateOrderById(id, orderInfo) {
    try {
      const result = await orders.findOne({ _id: ObjectId(id) })
      if (result) {
        const response = await orders.updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              customer_name: orderInfo.customer_name,
              date: new Date(orderInfo.date),
              positions: orderInfo.positions,
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

  static async generateBuyList(number) {
    //determine date & generate map
    let buyList = new Map()
    let suggestedDate = null
    let ordersList
    let cursor
    let totalNumArticles = 0
    try {
      if (isNaN(number)) {
        throw new Error(
          `${number} is not a number, please provide a number as argument`,
        )
      }
      if (number < 0) {
        suggestedDate = subDays(new Date(), Math.abs(number))
      }
      if (number > 0) {
        suggestedDate = addDays(new Date(), number)
      }
      const searchDate =
        suggestedDate === null ? startOfToday() : startOfDay(suggestedDate)
      console.log("Searchin Orders for date: " + searchDate)
      cursor = await orders.find({
        date: {
          $gte:
            suggestedDate === null ? startOfToday() : startOfDay(suggestedDate),
          $lte: suggestedDate === null ? endOfToday() : endOfDay(suggestedDate),
        },
      })
      ordersList = await cursor.toArray()

      const articles = await ArticlesDAO.getAllArticles()
      //Erstelle Map mit Schlüssel Name des Artikels und Wert 0
      articles.forEach(element => {
        switch (element.name) {
          case "Papr. Mix 5kg (R+G)":
            console.log(element.name)
            //Überspringen
            break
          default:
            buyList.set(element.name, 0)
            break
        }
      })
      ordersList.forEach(order =>
        order.positions.forEach(position => {
          switch (position.name) {
            case "Papr. Grün 5kg":
              console.log(position.name, position.number)
              buyList.set(
                "Papr. Grün 5kg",
                parseFloat(buyList.get("Papr. Grün 5kg"), 10) +
                  parseFloat(position.number, 10) * 5000,
              )
              break
            case "Papr. Rot 5kg":
              console.log(position.name, position.number)
              buyList.set(
                "Papr. Rot 5kg",
                parseFloat(buyList.get("Papr. Rot 5kg"), 10) +
                  parseFloat(position.number, 10) * 5000,
              )
              break
            case "Papr. Gelb 5kg":
              console.log(position.name, position.number)
              buyList.set(
                "Papr. Gelb 5kg",
                parseFloat(buyList.get("Papr. Gelb 5kg"), 10) +
                  parseFloat(position.number, 10) * 5000,
              )
              break
            case "Papr. Mix 5kg":
              buyList.set(
                "Papr. Grün 5kg",
                parseFloat(buyList.get("Papr. Grün 5kg"), 10) +
                  (position.number * 5000) / 3,
              )
              buyList.set(
                "Papr. Rot 5kg",
                parseFloat(buyList.get("Papr. Rot 5kg"), 10) +
                  (position.number * 5000) / 3,
              )
              buyList.set(
                "Papr. Gelb 5kg",
                parseFloat(buyList.get("Papr. Gelb 5kg"), 10) +
                  (position.number * 5000) / 3,
              )
              break
            case "Papr. Mix 5kg (R+G)":
              buyList.set(
                "Papr. Grün 5kg",
                parseFloat(buyList.get("Papr. Grün 5kg"), 10) + 5000 / 2,
              )
              buyList.set(
                "Papr. Rot 5kg",
                parseFloat(buyList.get("Papr. Rot 5kg"), 10) + 5000 / 2,
              )
              break
            default:
              buyList.set(
                position.name,
                parseFloat(buyList.get(position.name), 10) +
                  parseFloat(position.number, 10),
              )
              break
          }
        }),
      )
      // console.log(buyList.size)
      // console.log(buyList.get("Tomaten 5kg"))
      let buyListArray = []
      let arr = Array.from(buyList)
      arr.forEach(element =>
        buyListArray.push({ name: element[0], number: element[1] }),
      )
      buyListArray.forEach(element => {
        switch (element.name) {
          case "Papr. Grün 5kg":
            element.number =
              Math.round((element.number + Number.EPSILON) * 100) / 100000
            break
          case "Papr. Rot 5kg":
            element.number =
              Math.round((element.number + Number.EPSILON) * 100) / 100000
            break
          case "Papr. Gelb 5kg":
            element.number =
              Math.round((element.number + Number.EPSILON) * 100) / 100000
            break
          case "Zitronen Kiste":
            element.number = Math.round(element.number * 100) / 100
            break
          default:
            break
        }
      })
      console.log(buyListArray)
      buyListArray.forEach(
        element => (totalNumArticles = totalNumArticles + element.number),
      )
      generateBuylistPDF(buyListArray, searchDate)
      return {
        buyListArray: buyListArray,
        totalNumArticles: Math.round(totalNumArticles),
      }
    } catch (error) {
      console.error(`Unable to issue find command, ${error}`)
      return { buyListArray: [], totalNumArticles: 0 }
    }
  }

  static async generateDeliveryNotes(number) {
    let suggestedDate = null
    let ordersList
    let cursor
    try {
      if (isNaN(number)) {
        throw new Error(
          `${number} is not a number, please provide a number as argument`,
        )
      }
      if (number < 0) {
        suggestedDate = subDays(new Date(), Math.abs(number))
      }
      if (number > 0) {
        suggestedDate = addDays(new Date(), number)
      }
      const searchDate =
        suggestedDate === null ? startOfToday() : startOfDay(suggestedDate)
      console.log("Searchin Orders for date: " + searchDate)
      cursor = await orders.find({
        date: {
          $gte:
            suggestedDate === null ? startOfToday() : startOfDay(suggestedDate),
          $lte: suggestedDate === null ? endOfToday() : endOfDay(suggestedDate),
        },
      })
      ordersList = await cursor.toArray()
      generateDeliveryNotePDF(ordersList)
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }
}
