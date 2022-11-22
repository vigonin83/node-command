const fs = require("fs/promises")

async function addNote(title) {
   const notes = require("./db.json")
   const note = {
      title,
      id: Date.now().toString()
   }
   notes.push(note)
   await fs.writeFile("./db.json", JSON.stringify(notes))
}

function getNotes() {
   return require("./db.json")
}
async function removeNote(id) {
   let notes = require("./db.json")
   notes = notes.filter(note => Number(note.id) !== id)
   await fs.writeFile("./db.json", JSON.stringify(notes))
}

module.exports = {
   addNote, getNotes, removeNote
}