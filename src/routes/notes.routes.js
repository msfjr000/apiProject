const {Router} = require("express")

const notesRoutes = Router()

const NotesControllers = require("../controllers/NotesController")

const notesControllers = new NotesControllers()

notesRoutes.post("/notes/:user_id", notesControllers.createNote)
notesRoutes.delete("/notes/:user_id/:id", notesControllers.deleteNote)
notesRoutes.get("/notes/:user_id", notesControllers.showNotes)
notesRoutes.get("/notes", notesControllers.showSpecify)

module.exports = notesRoutes
