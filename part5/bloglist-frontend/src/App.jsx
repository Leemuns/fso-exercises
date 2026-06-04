import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const notificationRef = useRef()
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  const userId = user?.id ?? null

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
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

  const loginUser = async userCredentials => {
    try {
      const user = await loginService.login(userCredentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      displayNotification('Invalid username or password', true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    navigate('/')
  }

  const createBlog = async (newBlogObject) => {
    try {
      const newBlog = await blogService.create(newBlogObject)
      newBlog.user = {
        username: user.username,
        name: user.name,
        id: user.id
      }
      setBlogs(blogs.concat(newBlog))
      displayNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      const { title, author } = newBlogObject
      displayNotification(`failed to add blog "${title}" by ${author}. Error: ${error}`, true)
    }
  }

  const likeBlog = async (blogToUpdate) => {
    // increment like of blogToUpdate by one
    try {
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      const { id, ...blogWithoutId } = updatedBlog

      await blogService.update(id, blogWithoutId)
      setBlogs(
        blogs.map(blog => blog.id === id ? updatedBlog : blog)
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (error) {
      displayNotification(`Failed to like blog "${blogToUpdate.title}" by ${blogToUpdate.author}. Error: ${error}`, true)
    }
  }

  const removeBlog = async (blogToRemove) => {
    try {
      if (window.confirm(`Remove blog "${blogToRemove.title} by ${blogToRemove.author}"`)) {
        await blogService.remove(blogToRemove.id)
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
        displayNotification(`Removed blog "${blogToRemove.title}" by ${blogToRemove.author}`)
      }
    } catch (error) {
      displayNotification(`Failed to remove blog "${blogToRemove.title}" by ${blogToRemove.author}. Error: ${error}`, true)
    }
  }

  const displayNotification = (message, isError = false) => {
    notificationRef.current.setNotification({ message, isError })
    setTimeout(() => notificationRef.current.setNotification(null), 3000)
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to='/'>blogs</Link>
        {user && <Link style={padding} to='/create'>new blog</Link>}
        {!user ? <Link style={padding} to="/login">login</Link> : <button onClick={handleLogout}>Logout</button>}
      </div>

      <Notification ref={notificationRef} />

      <Routes>
        <Route path="/blogs/:id" element={
          <Blog blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} userId={userId} />
        } />
        <Route path='/login' element={
          <LoginForm loginUser={loginUser} />
        } />
        <Route path='/create' element={
          <CreateBlogForm createBlog={createBlog} userId={userId}/>
        } />
        <Route path='/' element={
          <Blogs blogs={blogs} />
        } />
      </Routes>
    </div>
  )

  // if (!user) {
  //   return (
  //     <div>
  //       <h2>log in to application</h2>
  //       <Notification ref={notificationRef}/>
  //       <LoginForm loginUser={loginUser} />
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div>
  //       <h2>blogs</h2>

  //       <Notification ref={notificationRef} />

  //       <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

  //       <Togglable buttonLabel='create new blog'>
  //         <CreateBlogForm createBlog={createBlog} />
  //       </Togglable>

  //       <Blogs blogs={blogs} handleLikeBlog={handleLikeBlog} handleRemoveBlog={handleRemoveBlog} userId={user.id}/>
  //     </div>
  //   )
  // }
}

export default App