import ArticlesDAO from "../../dao/ArticlesDAO.js"
import { constants } from "http2"
import { isLoggedIn } from "../../utils/token.js"
import fs from "fs"
import crypto from "crypto"

const config = {}

if (!process.env.JWT_PRIVATE_KEY) {
  config.jwtPrivateKey = fs.readFileSync("private.pem")
} else {
  config.jwtPrivateKey = Buffer.from(process.env.JWT_PRIVATE_KEY, "base64")
}
config.jwtPublicKey = crypto.createPublicKey(config.jwtPrivateKey)

export default class ArticlesController {
  static async apiGetArticles(req, res, next) {
    //if user not registered
    //if there is no Authorization Header and the Token is not ok
    if (
      !req.header("Authorization") ||
      !isLoggedIn(req.header("Authorization"), config.jwtPublicKey)
    ) {
      res.status(constants.HTTP_STATUS_UNAUTHORIZED).send()
      return
    }

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

  static async apiInsertArticle(req, res, next) {
    try {
      const body = req.body
      let errors = {}
      if (body && body.name.length < 3) {
        errors.name = "The name of the article must be at least 3 characters."
      }

      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "INSERTION_FAILED",
          message: errors.name,
        })
        return
      }

      const response = await ArticlesDAO.insertArticle(body.name)
      if (!response) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "ARTICLE_ALREADY_EXISTS",
          message: `Insertion failed, article with name ${body.name} already exist`,
        })
        return
      }
      res.status(constants.HTTP_STATUS_CREATED).json({
        code: "INSERTION_SUCCED",
        message: `${response.insertedCount} article with name ${body.name} and id ${response.insertedId} inserted.`,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiGetArticleById(req, res, next) {
    try {
      let id = req.params.id || {}
      let article = await ArticlesDAO.getArticleById(id)
      if (!article) {
        res.status(constants.HTTP_STATUS_NOT_FOUND).json({
          code: "ARTICLE_NOT_FOUND",
          message: `Article with id ${id} could not be found.`,
        })
        return
      }

      if (article.error) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "ID_INCORRECT",
          message: `Entered id ${id} was incorrect`,
        })
        return
      }

      res.status(constants.HTTP_STATUS_OK).json({
        _id: article._id,
        name: article.name,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiUpdateArticleById(req, res, next) {
    try {
      let id = req.params.id || {}
      let body = req.body
      let errors = {}

      if (Object.keys(body).length === 0) {
        errors.name =
          "You have to specify a new or modified name for the article inside the body of your request."
      } else if (body && body.name?.length < 3) {
        errors.name = "The name of the article must be at least 3 characters."
      }
      if (id?.length !== 24) {
        errors.id = "An error occured with the id"
      }

      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "PATCH_FAILED",
          message: errors,
        })
        return
      }

      const {
        matchedCount,
        modifiedCount,
      } = await ArticlesDAO.updateArticleById(id, body.name)

      if (matchedCount === 1 && modifiedCount === 0) {
        res.status(constants.HTTP_STATUS_NOT_MODIFIED).json({
          code: "ARTICLE_NOT_MODIFIED",
          message: "Article was found but not modified.",
        })
        return
      }

      if (!modifiedCount) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "PATCH_FAILED",
          message: `No article with id ${id} found.`,
        })
        return
      }

      res.status(constants.HTTP_STATUS_OK).json({
        code: "PATCH_SUCCED",
        message: `${modifiedCount} Object with id ${id} modified.`,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiDeleteArticleById(req, res, next) {
    try {
      let id = req.params.id || {}
      let errors = {}
      if (id.length !== 24) {
        errors.id = "An error occured with the id"
      }
      if (Object.keys(errors).length > 0) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "DELETION_FAILED",
          message: errors,
        })
        return
      }
      const response = await ArticlesDAO.deleteArticleById(id)

      if (response.deletedCount < 1) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          code: "DELETION_FAILED",
          message: `No Article with id ${id} found.`,
        })
        return
      }

      res.status(constants.HTTP_STATUS_OK).json({
        code: "DELETION_SUCCED",
        message: `${response.deletedCount} Article with id ${id} deleted.`,
      })
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }

  static async apiGetListOfAllArticles(req, res) {
    try {
      const response = await ArticlesDAO.getAllArticles()
      if (!response) {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        return
      }
      res.status(constants.HTTP_STATUS_OK).json(response)
    } catch (error) {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ error: error })
    }
  }
}
