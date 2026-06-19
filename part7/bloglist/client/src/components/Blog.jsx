import { useNavigate, useParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Link,
  List,
  ListItem,
} from '@mui/material'

import FieldInput from './FieldInput'
import useBlogs from '../hooks/useBlogs'
import useField from '../hooks/useField'
import useCurrentUser from '../hooks/useCurrentUser'

const Blog = () => {
  const navigate = useNavigate()
  const { blogId } = useParams()
  const { isPending, getBlog, likeBlog, removeBlog, addComment } = useBlogs()
  const { user } = useCurrentUser()
  const comment = useField({
    label: 'add a comment',
    styleType: 'comment',
    name: 'comment',
  })

  if (isPending) {
    return <div>loading blog...</div>
  }

  const blog = getBlog(blogId)

  const handleLike = () => likeBlog(blog)

  const handleRemove = () => {
    removeBlog(blog)
    navigate('/')
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    addComment(blogId, event.target.elements.comment.value)
    comment.clear()
  }

  const showIfLoggedIn = { display: user?.id ? '' : 'none' }
  const showIfUserMatch = { display: user?.id === blog.user.id ? '' : 'none' }

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

        <Typography variant="h6" sx={{ pt: 3.2 }}>
          comments
        </Typography>
        <form onSubmit={handleAddComment}>
          <FieldInput {...comment} />
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: 10, marginLeft: 8 }}
          >
            Add comment
          </Button>
        </form>
        <List
          dense
          sx={{
            listStyleType: 'disc',
            pl: 4,
            '& .MuiListItem-root': {
              display: 'list-item',
              fontSize: '1rem',
              padding: 0,
            },
          }}
        >
          {blog.comments.map((c) => (
            <ListItem key={c.id}>{c.text}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default Blog
