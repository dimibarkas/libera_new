let articles

export default class ArticlesDAO {
  static async injectDB(conn) {
    if (articles) {
      return
    }
    try {
      articles = await conn.db(process.env.LIBERA_NS).collection("articles")
      this.articles = articles //this is only for testing
    } catch (e) {
      console.error(`Unable to establish a connection in UsersDAO: ${e}`)
    }
  }

  static async getArticles() {
    return { articlesList: [], totalNumArticles: [] }
  }
}
