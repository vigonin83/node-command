const { string } = require("yargs");
const yargs = require("yargs");
const { addNote, getNotes, removeNote } = require("./notes.controller")

yargs.command({
   command: 'add',
   describe: 'Add note to list',
   builder: {
      title: {
         type: string,
         describe: "note title",
         demandOption: true
      }
   },
   handler({ title }) {
      addNote(title)
      console.log(title);
   }
})
yargs.command({
   command: 'list',
   describe: 'Print all notes',
   handler() {
      const notes = getNotes()
      notes.forEach(note => console.log(note.id, note.title))
   }
})
yargs.command({
   command: 'remove',
   describe: 'Remove note by id',
   id:{
      type: string,
      describe: 'note id',
      demandOption: true,
  },
   handler({ id }) {
         removeNote(id)
      }
})

yargs.parse()