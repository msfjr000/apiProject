const knexConection = require("../database/knex")

class NotesController {
    async createNote (request,response) {
        const {title,description, rating,tags} = request.body
        const {user_id} = request.params

        const user = await knexConection("users").where({id: user_id}).first()

        const verify =  typeof(tags)

        if (verify != "object") {
            return response.status(404).json({
                status: "Error",
                message: `Tags is on wrong format, need to be [ ''example1'' , ''example2'' ]`
            })
        }

        if (!user) {
            return response.status(404).json({
                message: "User do not registered"
            })
        }

        const [note_id] = await knexConection("notes").insert({
            title,description,rating,user_id
        })

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        })

        await knexConection("tags").insert(tagsInsert)

        response.json()

    }
    async deleteNote (request,response) {
        const {user_id,id} = request.params

        const note = await knexConection("notes").where({id}).first()

        if (!note) {
            return response.status(404).json({
                message: "This note not exists"
            })
        }

        if (note.user_id != user_id) {
            return response.status(404).json({
                message: "this note not belongs at this user"
            })
        }

        await knexConection("notes").where({id}).delete()
        return response.status(200).json({
            message: "Note deleted sucessfully"
        })

    }
    async showNotes (request,response) {
        const {user_id} = request.params

        const note = await knexConection("notes").where({user_id}).orderBy("created_at")

        response.status(200).json(note)
    }
    async showSpecify (request,response) {
        const {user_id, title,tags } = request.query

        let note;

        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim())
            console.log(filterTags)

            note = await knexConection("tags").select("notes.id","notes.user_id","notes.title","tags.name","notes.description","notes.rating").where("notes.user_id", user_id).whereLike("notes.title",`%${title}%`).whereIn("name", filterTags).innerJoin("notes","notes.user_id","tags.user_id").orderBy("notes.title")

            return response.status(200).json(note)

        } else {
            note = await knexConection("notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title")
        }
        const userTags = await knexConection("tags").where({user_id})

        const notesWithTags = note.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        })

        return response.status(200).json(notesWithTags)

    }
}

module.exports = NotesController