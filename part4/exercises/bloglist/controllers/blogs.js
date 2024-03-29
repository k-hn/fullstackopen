const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog === null) {
    response.status(404).end()
  } else {
    response.json(blog)
  }
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.likes === undefined) {
    request.body.likes = 0
  }

  const user = request.user
  request.body.user = user.id

  const blog = new Blog(request.body)
  const savedBlog = await blog.save()

  // save blog information under user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // only allow creator of blog delete privileges
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog === null) {
    return response.status(404).json({ error: 'not found' })
  }
  if (blog.user.toString() === user.id) {
    await blog.deleteOne()
    return response.status(204).end()
  } else {
    return response
      .status(401)
      .json({ error: 'unauthorized user cannot delete blog they don\'t own' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter
