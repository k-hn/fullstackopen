const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
  response
    .status(404)
    .send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response
      .status(400)
      .send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response
      .status(400)
      .send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response
      .status(401)
      .json({ error: error.message })
  }

  next(error)
}

const getJWT = (request) => {
  console.log("request auth: ", request.authorization)
  console.log("request.headers", request.headers)
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  } else {
    return null
  }
}

const tokenExtractor = (request, response, next) => {
  request.token = getJWT(request)

  next()
}

const userExtractor = async (request, response, next) => {
  const token = getJWT(request)
  console.log("token: ", token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (decodedToken.id === undefined) {
    return response
      .status(401)
      .json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  request.user = user

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
