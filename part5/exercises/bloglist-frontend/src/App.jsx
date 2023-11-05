import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    blogService.setToken(null)
    setUser(null)
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
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>log out</button>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
