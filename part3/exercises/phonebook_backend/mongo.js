const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(3)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.1wbrwbm.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const addPerson = (name, number) => {
  const person = new Person({
    name,
    number
  })

  person.save().then(() => {
    console.log('person saved')
    mongoose.connection.close()
  })
}

const getPhonebook = () => {
  Person.find({}).then(result => {
    printPhonebook(result)
    mongoose.connection.close()
  })
}

const printPhonebook = (phonebook) => {
  console.log('phonebook')
  phonebook.forEach(person => printPersonRow(person))
}

const printPersonRow = (person) => {
  console.log(`${person.name} ${person.number}`)
}

if (process.argv.length === 5) {
  // add person to phonebook
  const name = process.argv[3]
  const number = process.argv[4]

  addPerson(name, number)
} else if (process.argv.length === 3) {
  // get phonebook
  getPhonebook()
} else {
  console.log('Wrong number of arguments provided')
}
