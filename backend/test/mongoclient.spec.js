import { MongoClient } from "mongodb"

describe("MongoClient", () => {
  test("Client initialized with URI", async () => {
    let testClient
    try {
      testClient = await MongoClient.connect(process.env.LIBERA_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

      expect(testClient).not.toBeNull()
    } catch (error) {
      expect(error).toBeNull()
    } finally {
      testClient.close()
    }
  })
})
