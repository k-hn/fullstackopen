const express = require("express")
const app = express()

app.use(express.json())

let persons = [
  { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
  return response.json(persons)
})


app.get("/info", (request, response) => {
  const numPersons = persons.length
  const now = new Date()
  
  return response.send(`
      <p>Phonebook has info for ${numPersons} people</p>
      <p>${now.toDateString()} ${now.toTimeString()}</p>
    `)
})


app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => id === person.id)

  if (person) {
    return response.json(person)
  } else {
    return response.status(404).end()
  }
})


app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  return response.status(204).end()
})


app.post("/api/persons", (request, response) => {
  const body = request.body

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()    
  }

  persons = persons.concat(newPerson)

  return response.status(201).json(newPerson)
})

const generateId = () => {
  const existingIds = persons.map(person => person.id)

  // Try for a unique id 10 times. If unsuccessful, default to -1
  for (let i = 0; i < 10; i++) {
    // Generate random number from 0 to 10000
    const randomNumber = Math.floor(Math.random() * 10001)
    if (!existingIds.includes(randomNumber)) {
      return randomNumber
    }
  }

  return -1
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`)
})