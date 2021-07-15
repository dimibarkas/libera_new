import CustomersDAO from "../../src/dao/CustomersDAO"

describe("Basic CRUD on customers", () => {
  beforeAll(async () => {
    await CustomersDAO.injectDB(global.liberaClient)
  })

  test("Can return a list of Customers", async () => {
    const customers = await CustomersDAO.getCustomers()
    expect(customers.customerList.length > 1)
  })

  const testCustomerInfo = {
    name: "TestCustomer",
    address: {
      street: "Danzingerstraße 20",
      nr: "6",
      zipcode: "525252",
      city: "Heinsberg",
      country: "Deutschland",
    },
    phone: "+641564354351",
  }
  let customerId

  test("Can perform an insertion of an customer", async () => {
    const insertedCustomer = await CustomersDAO.insertCustomer(testCustomerInfo)
    customerId = insertedCustomer.insertedId
    expect(insertedCustomer.insertedCount).toBe(1)
  })

  test("Can reject an insertion of a customer if this customer already exist by name", async () => {
    const insertedCustomer = await CustomersDAO.insertCustomer(testCustomerInfo)
    expect(insertedCustomer).toBe(null)
  })

  test("Can search an article by id", async () => {
    const customer = await CustomersDAO.getCustomerById(customerId)
    expect(customer.name).toBe(testCustomerInfo.name)
  })
})
