const { string } = require("yargs");
const yargs = require("yargs");
const { addNote, getNotes, removeNote, editNote } = require("./notes.controller")

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
      console.log(`Новая заметка с зоголовком ${title} добавлена`);
   }
})
yargs.command({
   command: 'list',
   describe: 'Print all notes',
   async handler() {
      const notes = await getNotes()
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
      console.log(`Заметка с id ${id} удалена`);
      }
})
yargs.command({
   command: "edit",
   describe: "Edit note by id",
   builder: {
      title: {
         type: string,
         describe: "note title",
         demandOption: true
      },
      id:{
         type: string,
         describe: 'note id',
         demandOption: true,
     },
   },
   handler({title, id}) {
      editNote(title, id)
      console.log(`В заметке Id - ${id} изменен заголовок на ${title}.`);
   }
})

yargs.parse()