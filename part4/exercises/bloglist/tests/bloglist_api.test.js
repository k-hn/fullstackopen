const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(helper.initialBloglist)
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
})

test('blog list is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBloglist.length)
})

test('blog contains id key', async () => {
  const blog = (await helper.blogsInDb())[0]
  expect(blog.id).toBeDefined()
})

test('a valid note can be added', async () => {
  const blog = {
    title: '2023 Photomicrography Competition',
    author: 'Nikon',
    url: 'https://www.nikonsmallworld.com/galleries/2023-photomicrography-competition',
    likes: 23,
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const currentBlogs = await helper.blogsInDb()
  expect(currentBlogs).toHaveLength(helper.initialBloglist.length + 1)
})
