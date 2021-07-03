import { Router } from "express"
import ArticlesController from "./articles.controller"

const router = new Router()

router.route("/").get(ArticlesController.apiGetArticles)
router.route("/search").get(ArticlesController.apiSearchArticles)

export default router
