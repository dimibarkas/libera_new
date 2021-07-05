import { Router } from "express"
import ArticlesController from "./articles.controller"

const router = new Router()

router.route("/").get(ArticlesController.apiGetArticles)
router.route("/search").get(ArticlesController.apiSearchArticles)
router.route("/").post(ArticlesController.apiInsertArticle)
router.route("/id/:id").get(ArticlesController.apiGetArticleById)
router.route("/id/:id").patch(ArticlesController.apiUpdateArticleById)
router.route("/id/:id").delete(ArticlesController.apiDeleteArticleById)

export default router
