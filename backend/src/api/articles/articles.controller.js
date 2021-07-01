import ArticlesDAO from "../../dao/ArticlesDAO.mjs";

export default class ArticlesController {
    static async apiGetArticles(req, res, next) {
        const ARTICLES_PER_PAGE = 20;
        const { articlesList, totalNumArticles } = await ArticlesDAO.getArticles();
        let response = {
            articles: articlesList,
            page: 0,
            filters: {},
            entries_per_page: ARTICLES_PER_PAGE,
            total_results: totalNumArticles,
        }
        res.json(response)
    }
}