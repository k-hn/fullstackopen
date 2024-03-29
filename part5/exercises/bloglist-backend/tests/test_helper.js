const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')


const initialBloglist =
  [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: '6545822f3113e325c5d5da50',
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: '6545822f3113e325c5d5da50',
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: '6545822f3113e325c5d5da50',
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      user: '6545822f3113e325c5d5da50',
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      user: '6545822f3113e325c5d5da50',
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      user: '6545822f3113e325c5d5da50',
      __v: 0
    }
  ]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  // return blogs.map(note => note.toJSON())
  return blogs
}

const getNonExistingBlog = async () => {
  const blog = new Blog(
    {
      title: '2023 Photomicrography Competition',
      author: 'Nikon',
      url: 'https://www.nikonsmallworld.com/galleries/2023-photomicrography-competition',
      likes: 23,
    })

  await blog.save()
  await blog.deleteOne()
  return blog
}

const createSuperUser = async () => {
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = await User({
    _id: '6545822f3113e325c5d5da50',
    username: 'root',
    name: 'Superuser',
    passwordHash
  })

  await user.save()

  return user
}

const usersInDb = async () => {
  const users = await User.find({})

  return users
}

const loginUser = async (api, username, password) => {
  const loginDetails = {
    username,
    password
  }

  const response = await api
    .post('/api/login')
    .send(loginDetails)

  return response.body
}

module.exports = {
  initialBloglist,
  blogsInDb,
  getNonExistingBlog,
  createSuperUser,
  usersInDb,
  loginUser
}
