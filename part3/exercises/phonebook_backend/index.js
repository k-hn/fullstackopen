const express = require("express")
const morgan = require("morgan")
const app = express()

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(":method :url :status :res[Content-Length] - :response-time ms :body"))


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

  // Error handling
  // Fail if name or number is missing
  // Fail if name already exists in the phonebook
  if (!body.name) {
    return response.status(400).json({
      errror: "name is required"
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: "number is required"
    })
  } else if (persons.map(person => person.name).includes(body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
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