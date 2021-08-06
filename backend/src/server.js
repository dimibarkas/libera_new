import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import articles from "./api/articles/articles.route"
import users from "./api/users/users.route"
import customers from "./api/customers/customers.route"
import orders from "./api/orders/orders.route"
import path from "path"
import pdf from "html-pdf"

const pdfTemplate = require("../reports")

const app = express()

app.use(cors())
process.env.NODE_ENV !== "production" && app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Report Test
app.post("/api/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", err => {
    if (err) {
      res.send(Promise.reject())
    }

    res.send(Promise.resolve())
  })
})

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
})

//Register api routes
app.use("/api/articles", articles)
app.use("/api/users", users)
app.use("/api/customers", customers)
app.use("/api/orders", orders)
app.use("/", express.static("public"))
app.use("*", (req, res) =>
  res.sendFile(path.join(path.resolve(), "public/index.html")),
)

export default app
