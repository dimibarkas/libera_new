import OrdersDAO from "../../src/dao/OrdersDAO"
import ArticlesDAO from "../../src/dao/ArticlesDAO"
import { addDays } from "date-fns"

describe("Basic CRUD on orders", () => {
  beforeAll(async () => {
    await OrdersDAO.injectDB(global.liberaClient)
  })

  test("Can return a list of all orders", async () => {
    const orders = await OrdersDAO.getOrders()
    expect(orders.ordersList.length > 0).toBeTruthy()
  })

  //Insertion
  const testOrder0 = {
    customer_name: "Restaurant Hellas",
    date: new Date(),
    positions: [
      { name: "Tomaten", number: "2" },
      { name: "Gurken", number: "3" },
    ],
  }
  //Insertion
  const testOrder1 = {
    customer_name: "Restaurant Mykonos",
    date: new Date(),
    positions: [
      { name: "Tomaten", number: "2" },
      { name: "Gurken", number: "3" },
    ],
  }
  //Rejection
  const testOrder2 = {
    customer_name: "Restaurant Hellas",
    date: new Date(),
    positions: [
      { name: "Tomaten", number: "2" },
      { name: "Gurken", number: "3" },
    ],
  }
  //Insertion (one day later)
  const testOrder3 = {
    customer_name: "Restaurant Hellas",
    date: addDays(new Date(), 1),
    positions: [
      { name: "Tomaten", number: "5" },
      { name: "Gurken", number: "2" },
      { name: "Eisberg", number: "3" },
      { name: "Weiskohl", number: "1" },
    ],
  }
  let testOrderId0
  let testOrderId1
  let testOrderId3

  //Insertion
  test("Can perform an insertion of an order.", async () => {
    const insertedOrder = await OrdersDAO.insertOrder(testOrder0)
    testOrderId0 = insertedOrder.insertedId
    expect(insertedOrder.insertedCount).toBe(1)
  })
  //Insertion
  test("Can perform an insertion of an order, if the order with the specified customer and date not already exist", async () => {
    const insertedOrder = await OrdersDAO.insertOrder(testOrder1)
    testOrderId1 = insertedOrder.insertedId
    expect(insertedOrder.insertedCount).toBe(1)
  })
  //Rejection
  test("Can reject the insertion of an order, if the order with the specified customer and date exist", async () => {
    const insertedOrder = await OrdersDAO.insertOrder(testOrder2)
    expect(insertedOrder).toBe(null)
  })
  //Insertion
  test("Can perform an insertion of an order, if the order with the specified customer and date not already exist", async () => {
    const insertedOrder = await OrdersDAO.insertOrder(testOrder3)
    testOrderId3 = insertedOrder.insertedId
    expect(insertedOrder.insertedCount).toBe(1)
  })

  test("Can search an order by id", async () => {
    const order = await OrdersDAO.getOrderById(testOrderId0)
    expect(order.customer_name).toBe(testOrder0.customer_name)
  })

  test("Can search orders by current date", async () => {
    const orders = await OrdersDAO.getCurrentOrders(0)
    // console.log(orders)
    const orders1 = await OrdersDAO.getCurrentOrders(-5)
    // console.log(orders1)
    const ordersTomorrow = await OrdersDAO.getCurrentOrders(1)
    // console.log(ordersTomorrow)
  })

  test("Can delete orders by id", async () => {
    const deletedOrder0 = await OrdersDAO.deleteOrderById(testOrderId0)
    expect(deletedOrder0.deletedCount).toBe(1)
    const deletedOrder1 = await OrdersDAO.deleteOrderById(testOrderId1)
    expect(deletedOrder1.deletedCount).toBe(1)
    const deletedOrder3 = await OrdersDAO.deleteOrderById(testOrderId3)
    expect(deletedOrder3.deletedCount).toBe(1)
  })

  test("Can generate a buylist for a specific date", async () => {
    await ArticlesDAO.injectDB(global.liberaClient)
    await OrdersDAO.generateBuyList(-137)
  })
})
