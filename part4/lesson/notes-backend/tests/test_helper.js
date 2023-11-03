const bcrypt = require('bcrypt')
const Note = require('../models/note')
const User = require('../models/user')


const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}


// const usersInDb = async () => {
//   const users = await User.find({})
//   return users
//   // return users.map(u => u.toJSON)
// }

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const createSuperUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash
  })

  await user.save()

  return user
}

const getTokenFrom = responseBody => {
  if (responseBody.token) {
    return responseBody.token.replace('Bearer ', '')
  }

  return null
}


module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  createSuperUser,
  getTokenFrom
}
