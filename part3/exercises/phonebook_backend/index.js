require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")
const app = express()

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(":method :url :status :res[Content-Length] - :response-time ms :body"))
app.use(cors())
app.use(express.static("dist"))

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
  Person.find({})
    .then(people => {
      response.json(people)
    })
})


app.get("/info", (request, response) => {
  const numPersons = persons.length
  const now = new Date()

  return response.send(`
      <p>Phonebook has info for ${numPersons} people</p>
      <p>${now.toDateString()} ${now.toTimeString()}</p>
    `)
})


app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})


app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

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
  if (body.name === undefined) {
    return response.status(400).json({
      errror: "name is required"
    })
  } else if (body.number === undefined) {
    return response.status(400).json({
      error: "number is required"
    })
  }
  /*
  else if (persons.map(person => person.name).includes(body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }
  */
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.status(201).json(savedPerson)
  })
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
