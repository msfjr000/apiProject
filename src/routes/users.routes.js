const {Router} = require("express")

const userRoutes = Router()

const UsersControllers = require("../controllers/UsersController")

const usersControllers = new UsersControllers()

userRoutes.post("/users", usersControllers.create)
userRoutes.put("/users/:id", usersControllers.update)

module.exports = userRoutes
