import { Router } from "express"
import ArticlesController from "./articles.controller"

const router = new Router()

router.route("/").get(ArticlesController.apiGetArticles)


export default router