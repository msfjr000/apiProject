const express = require("express")

const app = express()

const PORT = 3333

const migrationsRun = require("./database/migrations")

const routes = require("./routes")

migrationsRun()

app.use(express.json())

app.use(routes)

app.listen(PORT,() => {
    console.log("Server is running on PORT 3333")
})