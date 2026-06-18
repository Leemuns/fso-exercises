import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { Container, AppBar, Button, Toolbar, Typography } from '@mui/material'

import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import ErrorBoundary from './components/ErrorBoundary'
import blogService from './services/blogs'
import loginService from './services/login'
import useNotification from './hooks/useNotification'
import useBlogs from './hooks/useBlogs'

const App = () => {
  const { blogs, isPending } = useBlogs()
  const [user, setUser] = useState(null)

  const { displayMessage } = useNotification()
  const navigate = useNavigate()
  const userId = user?.id ?? null
  const match = useMatch('/blogs/:id')
  const blog =
    match && !isPending
      ? blogs.find((blog) => blog.id === match.params.id)
      : null

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (isPending) {
    return <div>Loading</div>
  }

  const loginUser = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
    } catch {
      displayMessage('Invalid username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    navigate('/')
  }

  const likeBlog = async (blogToUpdate) => {
    // increment like of blogToUpdate by one
    try {
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      const { id, ...blogWithoutId } = updatedBlog

      await blogService.update(id, blogWithoutId)
      // setBlogs(
      //   blogs
      //     .map((blog) => (blog.id === id ? updatedBlog : blog))
      //     .sort((a, b) => b.likes - a.likes),
      // )
    } catch (error) {
      displayMessage(
        `Failed to like blog "${blogToUpdate.title}" by ${blogToUpdate.author}. Error: ${error}`,
        'error',
      )
    }
  }

  const removeBlog = async (blogToRemove) => {
    try {
      if (
        window.confirm(
          `Remove blog "${blogToRemove.title} by ${blogToRemove.author}"`,
        )
      ) {
        await blogService.remove(blogToRemove.id)
        // setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))
        displayMessage(
          `Removed blog "${blogToRemove.title}" by ${blogToRemove.author}`,
        )
        navigate('/')
      }
    } catch (error) {
      displayMessage(
        `Failed to remove blog "${blogToRemove.title}" by ${blogToRemove.author}. Error: ${error}`,
        'error',
      )
    }
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>

          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/create">
              new blog
            </Button>
          )}
          {!user && (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}
          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                likeBlog={likeBlog}
                removeBlog={removeBlog}
                userId={userId}
              />
            }
          />
          <Route path="/login" element={<LoginForm loginUser={loginUser} />} />
          <Route path="/create" element={<CreateBlogForm user={user} />} />
          <Route path="/" element={<BlogList />} />
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
