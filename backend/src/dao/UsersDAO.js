let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.LIBERA_NS).collection("users")
            this.users = users //this is only for testing
        } catch (e) {
            console.error(
                `Unable to establish a connection in UsersDAO: ${e}`
            )
        }
    }
}


