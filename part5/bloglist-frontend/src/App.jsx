import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
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
      displayNotification('Invalid username or password', true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleCreateBLog = async () => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      displayNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      displayNotification(`failed to add blog ${title} by ${author}\nError: ${error}`, true)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLike = async (blogToUpdate) => {
    // increment like of blogToUpdate by one
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    const { id, ...blogWithoutId } = updatedBlog

    await blogService.update(id, blogWithoutId)
    setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
  }

  const displayNotification = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => setNotification({ message: null }), 3000)
  }

  if (!user) {
    return (
      <div>
        <LoginForm notification={notification} username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>

        <Notification notification={notification}/>

        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

        <Togglable buttonLabel='create new blog'>
          <CreateBlogForm
            handleCreateBlog={handleCreateBLog}
            title={title} setTitle={setTitle}
            author={author} setAuthor={setAuthor}
            url={url} setUrl={setUrl}
          />
        </Togglable>

        <Blogs blogs={blogs} handleLike={handleLike} />
      </div>
    )
  }

}

export default App