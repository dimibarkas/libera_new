let users

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return
    }
    try {
      users = await conn.db(process.env.LIBERA_NS).collection("users")
    } catch (e) {
      console.error(`Unable to establish a connection in UsersDAO: ${e}`)
    }
  }
  /**
   * Finds a user in the users collection
   * @param {*} username - The username of the desired user
   * @returns {Object|null} Return either a single user or nothin
   */
  static async findByUsername(username) {
    return await users.findOne({ username: username })
  }
  /**
   * Adds a user to the `users` collection
   * @param {UserInfo} userInfo - The information of the user to add
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async createAccount(userInfo) {
    try {
      const result = await users.findOne({ username: userInfo.username })
      if (!result) {
        const { insertedCount } = await users.insertOne({
          name: userInfo.name,
          username: userInfo.username,
          password: userInfo.password,
        })
        return { insertedCount: insertedCount }
      }
      return null
    } catch (e) {
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }

  static async deleteAccountByUsername(username) {
    try {
      const response = await users.deleteOne({ username: username })
      if (response) {
        return response
      }
      return null
    } catch (error) {
      console.error(`Error occurred while deleting the article, ${error}.`)
      return { error: error }
    }
  }
}
