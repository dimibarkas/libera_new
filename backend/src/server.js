import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import articles from "./api/articles/articles.route"
import users from "./api/users/users.route"
import customers from "./api/customers/customers.route"
import orders from "./api/orders/orders.route"
import path from "path"
import fs from "fs"
import generateDeliveryNotePDF from "./report/generate-delivery-note"

const app = express()

app.use(cors())
process.env.NODE_ENV !== "production" && app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/fetch-buylist", (req, res) => {
  var options = {
    root: path.join(__dirname, "../reports"),
  }
  // res.set('Content-Disposition', 'attachment; filename=buylist.pdf')
  res.sendFile("einkaufsliste.pdf", options, function(err) {
    if (err) {
      console.error(err)
    } else {
      console.log("buylist succesfully sent to client!")
    }
  })
})

app.get("/fetch-deliverynotes", (req, res) => {
  var options = {
    root: path.join(__dirname, "../reports"),
  }
  // res.set('Content-Disposition', 'attachment; filename=lieferscheine.pdf')
  res.sendFile("lieferscheine.pdf", options, function(err) {
    if (err) {
      console.error(err)
    } else {
      console.log("deliverynotes succesfully sent to client!")
    }
  })
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
