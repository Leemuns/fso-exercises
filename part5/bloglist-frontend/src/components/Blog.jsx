import Togglable from './Togglable'

const Blog = ({ blog, handleLikeBlog, handleRemoveBlog, userId }) => {
  const showIfLoggedIn = { display: userId ? '' : 'none' }
  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <div>{blog.url}</div>
        <div>
          <span>likes {blog.likes}</span>
          <button onClick={() => handleLikeBlog(blog)} style={showIfLoggedIn}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.id === userId &&
          <button onClick={() => handleRemoveBlog(blog)}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog