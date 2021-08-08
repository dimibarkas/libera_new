import ArticlesDAO from "../../src/dao/ArticlesDAO"

describe("Basic CRUD on articles", () => {
  beforeAll(async () => {
    await ArticlesDAO.injectDB(global.liberaClient)
  })

  test("Can resturn all article names", async () => {
    const articles = await ArticlesDAO.getAllArticles()
    expect(articles.length > 10).toBeTruthy()
  })

  test("Can return the list of Articles", async () => {
    const articles = await ArticlesDAO.getArticles()
    expect(articles.articlesList.length > 3).toBeTruthy()
  })

  const articleName = "TestArticle"
  let articleId
  test("Can perform an insertion of an article", async () => {
    const insertedArticle = await ArticlesDAO.insertArticle(articleName)
    articleId = insertedArticle.insertedId
    expect(insertedArticle.insertedCount).toBe(1)
  })

  test("Can reject an insertion of an article if this article already exist", async () => {
    const insertedArticle = await ArticlesDAO.insertArticle(articleName)
    expect(insertedArticle).toBe(null)
  })

  test("Can search an article by id", async () => {
    const article = await ArticlesDAO.getArticleById(articleId)
    expect(article.name).toBe(articleName)
  })

  test("Can delete an article by id", async () => {
    const deletedArticle = await ArticlesDAO.deleteArticleById(articleId)
    expect(deletedArticle.deletedCount).toBe(1)
  })
})
