const {Router} = require("express")

const routes = Router()

const userRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")

routes.use("/", userRoutes)
routes.use("/", notesRoutes)
routes.use("/", tagsRoutes)

module.exports = routes