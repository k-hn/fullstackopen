import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogURL, setBlogURL] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      clearLoginInputs()

    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const clearLoginInputs = () => {
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    // remove entry from local storage
    window.localStorage.removeItem("loggedInBlogAppUser")
    setUser(null)
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      clearBlogForm()
    } catch (exception) {
      console.log(exception)
    }
  }

  const clearBlogForm = () => {
    setBlogTitle("")
    setBlogAuthor("")
    setBlogURL("")
  }

  if (user === null) {
    return (
      <div>
        <h1>log in to application</h1>
        <LoginForm
          username={username}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          handleLogin={handleLogin}
        />

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      <div>
        <h1>create new </h1>
        <BlogForm
          blogTitle={blogTitle}
          blogAuthor={blogAuthor}
          blogURL={blogURL}
          setBlogTitle={setBlogTitle}
          setBlogAuthor={setBlogAuthor}
          setBlogURL={setBlogURL}
          handleBlogSubmit={handleBlogSubmit}
        />
      </div>
    </div>
  )
}



export default App
