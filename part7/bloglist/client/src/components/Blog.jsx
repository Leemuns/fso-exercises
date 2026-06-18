import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Link } from '@mui/material'

import useBlogs from '../hooks/useBlogs'

const Blog = ({ blog, userId }) => {
  const showIfLoggedIn = { display: userId ? '' : 'none' }
  const showIfUserMatch = { display: userId === blog.user.id ? '' : 'none' }

  const navigate = useNavigate()
  const { likeBlog, removeBlog } = useBlogs()

  const handleLike = () => likeBlog(blog)
  const handleRemove = () => {
    removeBlog(blog)
    navigate('/')
  }

  return (
    <Card className="blog">
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          {blog.title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
          by {blog.author}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'info.main', textDecoration: 'underline', mb: 1 }}
        >
          <Link href={blog.url} target="_blank">
            {blog.url}
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Added by {blog.user.name}
        </Typography>
        <Typography variant="body1">
          {blog.likes} likes
          <Button
            onClick={handleLike}
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
            style={showIfLoggedIn}
          >
            like
          </Button>
          <Button
            onClick={handleRemove}
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
            color="error"
            style={showIfUserMatch}
          >
            remove
          </Button>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Blog
