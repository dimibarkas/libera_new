import ArticlesDAO from "../../dao/ArticlesDAO.js"

export default class ArticlesController {
  static async apiGetArticles(req, res, next) {
    const ARTICLES_PER_PAGE = 20
    const { articlesList, totalNumArticles } = await ArticlesDAO.getArticles()
    let response = {
      articles: articlesList,
      page: 0,
      filters: {},
      entries_per_page: ARTICLES_PER_PAGE,
      total_results: totalNumArticles,
    }
    res.json(response)
  }

  static async apiSearchArticles(req, res, next) {
    const ARTICLES_PER_PAGE = 20
    let page
    try {
      page = req.query.page ? parseInt(req.query.page, 10) : 0
    } catch (e) {
      console.error(`Got bad value for page:, ${e}`)
      page = 0
    }
    let searchType
    try {
      searchType = Object.keys(req.query)[0]
    } catch (error) {
      console.error(`No search key specified: ${error}`)
    }

    let filters = {}

    switch (searchType) {
      case "text":
        if (req.query.text !== "") {
          filters.text = req.query.text
        }
        break
      default:
    }

    const { articlesList, totalNumArticles } = await ArticlesDAO.getArticles({
      filters,
      page,
      ARTICLES_PER_PAGE,
    })

    let response = {
      articles: articlesList,
      page: page,
      filters,
      entries_per_page: ARTICLES_PER_PAGE,
      total_results: totalNumArticles,
    }
    res.json(response)
  }

  static async apiAddArticle(req, res, next) {}
}
