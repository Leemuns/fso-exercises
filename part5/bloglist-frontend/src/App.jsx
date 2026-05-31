import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogsDisplay from './components/BlogsDisplay'
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

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      alert('wrong credentials')
    }
  }

  return (
    <div>
      {!user && <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />}
      {user && <BlogsDisplay user={user} blogs={blogs} />}
    </div>
  )
}

export default App