const fs = require("fs/promises")
const path = require('path')
const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
   const notes = await getNotes()
   const note = {
      title,
      id: Date.now().toString()
   }
   notes.push(note)
   await fs.writeFile(notesPath, JSON.stringify(notes))
   console.log("");
}

async function getNotes() {
   const notes = await fs.readFile(notesPath, {encoding: "utf-8"})
   return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}
async function removeNote(id) {
   let notes = await getNotes()
   notes = notes.filter(note => Number(note.id) !== id)
   await fs.writeFile(notesPath, JSON.stringify(notes))
}
async function editNote(title, id) {
   let notes = await getNotes()
   let noteIndex = notes.findIndex(note => note.id === String(id))
   notes[noteIndex].title = title
   await fs.writeFile(notesPath, JSON.stringify(notes))
}

module.exports = {
   addNote, getNotes, removeNote, editNote
}