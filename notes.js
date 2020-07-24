const fs = require("fs")
const chalk = require("chalk")

// ADD NOTES

const addNote = (title, body) => {
  const notes = loadNotes()
  // const duplicateNotes = notes.filter((note) => {
  //   return note.title === title
  // })

  const duplicateNoteSingular = notes.find((note) => note.title === title)

  debugger

  if (!duplicateNoteSingular) {
    notes.push({
      title: title,
      body: body,
    })
    saveNotes(notes)
    console.log(chalk.green.inverse("New note added!"))
  } else {
    console.log(chalk.red.inverse("Note title taken!"))
  }
}

// READ NOTES

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)
  if (note) {
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse("Note not found"))
  }
}

// LIST NOTES

const listNotes = () => {
  console.log(chalk.inverse("Your Notes"))
  const notes = loadNotes()
  notes.forEach((note) => {
    console.log(note.title)
  })
}

// REMOVE NOTES

const removeNotes = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => {
    return note.title !== title
  })

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed"))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse("No Note Found!!"))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json")
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote: readNote,
}
