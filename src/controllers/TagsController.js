const knexConection = require("../database/knex")

class TagsController {
    async show(request,response) {
        const {user_id} = request.params
        
        const tag = await knexConection("tags").where({user_id})

        return response.json(tag)
    }
}

module.exports = TagsController