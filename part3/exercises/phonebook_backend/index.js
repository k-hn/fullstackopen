require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[Content-Length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})


app.get('/info', (request, response, next) => {
  Person.find({})
    .then(result => {
      const numPersons = result.length
      const now = new Date()

      response.send(`
      <p>Phonebook has info for ${numPersons} people</p>
      <p>${now.toDateString()} ${now.toTimeString()}</p>
      `)
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // Error handling
  // Fail if name or number is missing
  // Update if name already exists in the phonebook
  if (body.name === undefined) {
    return response.status(400).json({
      errror: 'name is required'
    })
  } else if (body.number === undefined) {
    return response.status(400).json({
      error: 'number is required'
    })
  }

  // Check if name exists
  Person.find({ name: body.name })
    .then(result => {
      if (result.length === 0) {
        // Nonexisting name
        const person = new Person({
          name: body.name,
          number: body.number
        })

        person.save()
          .then(savedPerson => {
            response.status(201).json(savedPerson)
          })
          .catch(error => next(error))
      } else {
        // Existing name
        const existingRecord = result[0]
        const updatedPersonObject = {
          name: body.name,
          number: body.number
        }

        updatePerson(updatedPersonObject, existingRecord._id)
          .then(result => {
            response.json(result)
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }
  updatePerson(person, request.params.id)
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

const updatePerson = (updatedPersonObject, personID) => {
  return Person.findByIdAndUpdate(personID, updatedPersonObject, { new: true })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
