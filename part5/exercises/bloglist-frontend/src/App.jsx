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
  // const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState({
    message: "",
    isError: false,
    show: false
  })


  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInBlogAppUser")
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs(blogs)
  //   )
  // }, [])

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
      showNotification("wrong username or password", true)
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

      showNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} has been added`)
    } catch (exception) {
      showNotification(exception.response.data.error, true)
    }
  }

  const showNotification = (message, isError = false) => {
    setNotification({
      message,
      isError,
      show: true
    })

    setTimeout(hideNotification, 5000)
  }

  const hideNotification = () => {
    setNotification({
      message: "",
      isError: false,
      show: false
    })
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

        {notification.show &&
          <Notification
            message={notification.message}
            isError={notification.isError}
          />}
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
      {notification.show &&
        <Notification
          message={notification.message}
          isError={notification.isError}
        />}
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
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

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

const Notification = ({ isError, message }) => {
  const regularStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }

  return (
    <div style={isError ? errorStyle : regularStyle}>
      <p>{message}</p>
    </div>
  )
}

export default App
