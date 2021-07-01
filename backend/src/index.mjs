import app from "./server.mjs"
import { MongoClient } from "mongodb";
import UsersDAO from "./dao/UsersDAO.js";
import ArticlesDAO from "./dao/ArticlesDAO.mjs";
import CustomersDAO from "./dao/CustomersDAO";
import OrdersDAO from "./dao/OrdersDAO";


const port = process.env.PORT || 8080;

MongoClient.connect(
    process.env.LIBERA_DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
    .then(async client => {
        await UsersDAO.injectDB(client)
        await ArticlesDAO.injectDB(client)
        await CustomersDAO.injectDB(client)
        await OrdersDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Libera backend listening on Port ${port}`);
        })
    })

