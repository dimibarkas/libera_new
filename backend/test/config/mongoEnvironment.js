const MongoClient = require("mongodb").MongoClient
const NodeEnvironment = require("jest-environment-node")
module.exports = class MongoEnvironment extends NodeEnvironment {
  async setup() {
    if (!this.global.liberaClient) {
      this.global.liberaClient = await MongoClient.connect(
        process.env.LIBERA_DB_URI,
        // TODO: Connection Pooling
        // Set the connection pool size to 50 for the testing environment.
        // TODO: Timeouts
        // Set the write timeout limit to 2500 milliseconds for the testing environment.
        { useNewUrlParser: true, useUnifiedTopology: true },
      )
      await super.setup()
    }
  }

  async teardown() {
    await this.global.liberaClient.close()
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}
