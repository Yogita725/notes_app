const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) =>{
    console.log('Note to be added : '+title)
    const notes = loadNotes() // to load the notes already present in notes.json (to avoid overridding of data)
    //debugger

    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicate = notes.find((note) => note.title === title)
    //console.log(duplicate.length)
    //if(duplicateNotes.length === 0)
    if(duplicate === undefined)
    {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.bgWhite.bold('Note got added!'))
    }
    else{
        console.log(chalk.red.bgWhite.bold('Note is already taken!'))
    }
}

const removeNote = (title) => {
    console.log('Title to be removed : '+title)
    const notes = loadNotes()

    const titlePresent = notes.filter((note) =>
        note.title != title //callback function having return type as boolean
    )

    if(titlePresent.length == notes.length){
        console.log(chalk.red.bgWhite.bold('Note is not present'))
    }
    else{
        saveNotes(titlePresent)
        console.log(chalk.green.bgWhite.bold('Note got removed!'))
    }
}

const listNote = () => {
    console.log(chalk.magenta.bgWhite.bold('Your Notes'))
    const notes = loadNotes();
    notes.forEach((list) => {
        console.log(chalk.italic(list.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const gotNote = notes.find((note) => note.title === title)

    if(gotNote === undefined){
        console.log(chalk.red.bgWhite.italic('No Note found'))
    }
    else{
        console.log(chalk.blue.bold.bgWhite(gotNote.title))
        console.log(chalk.italic(gotNote.body))
    }
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }
    catch{
        return []
    }   
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNote :listNote,
    readNote : readNote
}