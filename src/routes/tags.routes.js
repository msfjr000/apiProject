const {Router} = require("express")

const tagsRoutes = Router()

const TagsControllers = require("../controllers/TagsController")

const tagsControllers = new TagsControllers()

tagsRoutes.get("/tags/:user_id", tagsControllers.show)

module.exports = tagsRoutes
