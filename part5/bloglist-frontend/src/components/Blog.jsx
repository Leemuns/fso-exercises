import { useNavigate } from 'react-router-dom'

import Togglable from './Togglable'

const Blog = ({ blog, likeBlog, removeBlog, userId }) => {
  const navigate = useNavigate()
  const showIfLoggedIn = { display: userId ? '' : 'none' }

  const handleLike = () => likeBlog(blog)

  const handleRemove = () => {
    removeBlog(blog)
    navigate('/')
  }

  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <div>{blog.url}</div>
        <div>
          <span>likes {blog.likes}</span>
          <button onClick={handleLike} style={showIfLoggedIn}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.id === userId &&
          <button onClick={handleRemove}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog