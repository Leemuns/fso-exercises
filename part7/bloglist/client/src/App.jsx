import { Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Button, Toolbar, Typography } from '@mui/material'

import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import ErrorBoundary from './components/ErrorBoundary'
import useUser from './hooks/useUser'

const App = () => {
  const { user, loginUser, logoutUser } = useUser()

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
            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route path="/blogs/:blogId" element={<Blog userId={user?.id} />} />
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
