const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(helper.initialBloglist)
  await helper.createSuperUser()
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
})


describe('get notes', () => {
  test('blog list is returned as json', async () => {
    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.token}`)

    expect(response.body).toHaveLength(helper.initialBloglist.length)
  })

  test('blog contains id key', async () => {
    const blog = (await helper.blogsInDb())[0]
    expect(blog.id).toBeDefined()
  })
})


describe('post note', () => {
  test('a valid note can be added', async () => {
    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    const blog = {
      title: '2023 Photomicrography Competition',
      author: 'Nikon',
      url: 'https://www.nikonsmallworld.com/galleries/2023-photomicrography-competition',
      likes: 23,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const currentBlogs = await helper.blogsInDb()
    expect(currentBlogs).toHaveLength(helper.initialBloglist.length + 1)
  })

  test('likes defaults to 0 when omitted during blog creation', async () => {
    const blog = {
      title: '2023 Photomicrography Competition',
      author: 'Nikon',
      url: 'https://www.nikonsmallworld.com/galleries/2023-photomicrography-competition',
    }

    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)

  })


  test('missing title during blog creation returns 400', async () => {
    const blog = {
      author: 'Nikon',
      url: 'https://www.nikonsmallworld.com/galleries/2023-photomicrography-competition',
      likes: 23,
    }

    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .send(blog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBeDefined()
  })

  test('missing author during blog creation returns 400', async () => {
    const blog = {
      title: '2023 Photomicrography Competition',
      url: 'https://www.nikonsmallworld.com/galleries/2023-photomicrography-competition',
      likes: 23,
    }

    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .send(blog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBeDefined()
  })

  test('fails when no bearer token is provided', async () => {
    const blog = {
      title: '2023 Photomicrography Competition',
      author: 'Nikon',
      url: 'https://www.nikonsmallworld.com/galleries/2023-photomicrography-competition',
      likes: 23,
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBeDefined()
  })
})


describe('delete note', () => {
  test('deleting existing blog passes returning 204', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .expect(204)

    const blogsAfterDeletion = await helper.blogsInDb()
    expect(blogsAfterDeletion).toHaveLength(blogs.length - 1)
  })

  test('deleting non-existing blog returns 204', async () => {
    const nonExistingBlogID = (await helper.getNonExistingBlog())._id.toString()
    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    await api
      .delete(`/api/blogs/${nonExistingBlogID}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .expect(404)
      .expect('Content-Type', /application\/json/)

    const blogsAfterDelete = await helper.blogsInDb()
    expect(blogsAfterDelete).toHaveLength(helper.initialBloglist.length)
  })

  test('fails when non-owner makes request to delete', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // create user
    const userDetails = {
      username: 'root2',
      name: 'midUser',
      password: 'midmidmid'
    }
    const userResponse = await api
      .post('/api/users')
      .send(userDetails)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // log created user in
    const loginDetails = {
      username: userDetails.username,
      password: userDetails.password
    }

    const loginResponse = await helper.loginUser(api, userDetails.username, userDetails.password)

    // attempt to delete blog created by root
    const blogToDelete = helper.initialBloglist[0]

    const response = await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})


describe('update note', () => {
  test('updating existing blog passes', async () => {
    const blogs = await helper.blogsInDb()
    const { id, title, author, url } = blogs[0]
    const blogToUpdate = {
      title,
      author,
      url,
      likes: 1000
    }
    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    const response = await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(1000)
  })
})

describe('get specific blog', () => {
  test('getting existing blog succeeds', async () => {
    const blogs = await helper.blogsInDb()
    const blogToGet = blogs[0]
    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    await api
      .get(`/api/blogs/${blogToGet.id}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('getting non-existing blog fails', async () => {
    const nonExistingBlog = await helper.getNonExistingBlog()
    const loginResponse = await helper.loginUser(api, 'root', 'sekret')

    await api
      .get(`/api/blogs/${nonExistingBlog.id}`)
      .set('Authorization', `Bearer ${loginResponse.token}`)
      .expect(404)

  })
})


describe('post user', () => {
  test('passes with valid data', async () => {
    const usersAtStart = await helper.usersInDb()

    const userData = {
      username: 'groot',
      name: 'Groot Sr.',
      password: 'I am groot'
    }

    await api
      .post('/api/users')
      .send(userData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('fails without username field', async () => {
    const usersAtStart = await helper.usersInDb()

    const userData = {
      name: 'Groot Sr.',
      password: 'I am groot'
    }

    await api
      .post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('fails without name field', async () => {
    const usersAtStart = await helper.usersInDb()

    const userData = {
      username: 'groot',
      password: 'I am groot'
    }

    await api
      .post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails without password field', async () => {
    const usersAtStart = await helper.usersInDb()

    const userData = {
      username: 'groot',
      name: 'Groot Sr.',
    }

    await api
      .post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails when username is shorter than expected minimum length', async () => {
    const usersAtStart = await helper.usersInDb()

    const userData = {
      username: 'g',
      name: 'Groot Sr.',
      password: 'I am groot'
    }

    await api
      .post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('fails when password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const userData = {
      username: 'groot',
      name: 'Groot Sr.',
      password: 'Ia'
    }

    await api
      .post('/api/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })



})

describe('get users', () => {
  test('passes for valid request', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    usernames = response.body.map(u => u.username)
    expect(usernames).toContain('root')
  })
})
