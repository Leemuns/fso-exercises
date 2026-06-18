import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Link } from '@mui/material'

import useBlogs from '../hooks/useBlogs'
import useCurrentUser from '../hooks/useCurrentUser'

const Blog = () => {
  const navigate = useNavigate()
  const { blogId } = useParams()
  const { isPending, getBlog, likeBlog, removeBlog } = useBlogs()
  const { user } = useCurrentUser()

  if (isPending) {
    return <div>loading blog...</div>
  }

  const blog = getBlog(blogId)
  const handleLike = () => likeBlog(blog)
  const handleRemove = () => {
    removeBlog(blog)
    navigate('/')
  }

  const showIfLoggedIn = { display: user?.Id ? '' : 'none' }
  const showIfUserMatch = { display: user?.Id === blog.user.id ? '' : 'none' }

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
