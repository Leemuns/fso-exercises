import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import FieldInput from './components/FieldInput'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
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

  const handleCreateBLog = async () => {
    event.preventDefault()

    const newBlog = await blogService.create({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')

    setBlogs(blogs.concat(newBlog))
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

        <form onSubmit={handleCreateBLog}>
          <h2>create new</h2>
          <FieldInput name='title' value={title} setValue={setTitle} />
          <FieldInput name='author' value={author} setValue={setAuthor} />
          <FieldInput name='url' value={url} setValue={setUrl} />

          <button type="submit">create</button>
        </form>

        <Blogs blogs={blogs} />
      </div>
    )
  }

}

export default App