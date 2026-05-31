import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      alert('wrong credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  if (!user) {
    return (
      <div>
        {!user && <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />}
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
        <Blogs blogs={blogs} />
      </div>
    )
  }

}

export default App