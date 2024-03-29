const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// add/remove/read/list notes with yargs

//create add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note content',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command:'remove',
    describe:'Remove the note',
    builder:{
        title:{
            describe:'Remove the note',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//create list command
yargs.command({
    command:'list',
    describe:'List your notes',
    handler(){
        notes.listNote()
    }
})

// create read command
yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            describe:'Read a note',
            demandOption : true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})
yargs.parse()
//console.log(yargs.argv)
