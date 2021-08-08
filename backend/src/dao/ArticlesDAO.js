import { ObjectId } from "bson"

let articles
const DEFAULT_SORT = []

export default class ArticlesDAO {
  static async injectDB(conn) {
    if (articles) {
      return
    }
    try {
      articles = await conn.db(process.env.LIBERA_NS).collection("articles")
      this.articles = articles //this is only for testing
    } catch (e) {
      console.error(`Unable to establish a connection in ArticlesDAO: ${e}`)
    }
  }
  /**
   * Finds and returns articles matching a given text in their name.
   * @param {*}
   */
  static textSearch(text) {
    const query = { $text: { $search: text } }
    const sort = []
    const project = {}

    return { query, project, sort }
  }
  /**
   *
   * @param {*} param0
   * @returns
   */
  static async getArticles({
    // setting the default parameters for the getArticles method
    filters = null,
    page = 0,
    articlesPerPage = 20,
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
      cursor = await articles
        .find(query)
        .project(project)
        .sort(sort)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { articlesList: [], totalNumArticles: 0 }
    }

    const displayCursor = cursor
      .limit(articlesPerPage)
      .skip(articlesPerPage * page)

    try {
      const articlesList = await displayCursor.toArray()
      const totalNumArticles = await articles.countDocuments(query)

      return { articlesList, totalNumArticles }
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
    }
    return { articlesList: [], totalNumArticles: 0 }
  }

  static async insertArticle(name) {
    try {
      const result = await articles.findOne({ name: name })
      if (!result) {
        const { insertedCount, insertedId } = await articles.insertOne({
          name: name,
        })
        let response = { insertedCount, insertedId }
        return response
      }
      return null
    } catch (e) {
      console.error(`Error occurred while adding a new article, ${e}.`)
      return { error: e }
    }
  }

  static async getArticleById(id) {
    try {
      const result = await articles.findOne({ _id: ObjectId(id) })
      if (!result) {
        return null
      }
      return result
    } catch (error) {
      console.error(`Error occurred while searching article, ${error}.`)
      return { error: error }
    }
  }

  static async updateArticleById(id, name) {
    try {
      const result = await this.getArticleById(id)
      if (result) {
        const response = await articles.updateOne(
          { _id: ObjectId(id) },
          { $set: { name: name } },
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

  static async deleteArticleById(id) {
    try {
      const response = await articles.deleteOne({ _id: ObjectId(id) })
      if (response) {
        return response
      }
      return null
    } catch (error) {
      console.error(`Error occurred while deleting the article, ${error}.`)
      return { error: error }
    }
  }

  static async getAllArticles() {
    try {
      const response = await articles
        .find({})
        .project({ _id: 0, name: 1 })
        .toArray()
      if (response) {
        return response
      }
      return null
    } catch (error) {
      console.error(`Error occurred while retrieving articles, ${error}.`)
      return { error: error }
    }
  }
}
