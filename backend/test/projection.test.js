import ArticlesDAO from "../src/dao/ArticlesDAO.js"

describe("Projection", () => {
  beforeAll(async () => {
    await ArticlesDAO.injectDB(global.liberaClient)
  })

  test("Can return no Articles", async () => {
    const articles = await ArticlesDAO.getArticles()
    expect(articles.articlesList.length).toEqual(3)
  })
})
