import { useState } from 'react'

import Togglable from './Togglable'

const Blog = ({ blog, handleLikeBlog, handleRemoveBlog, userId }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const togglevisibility =() => {
    setVisible(!visible)
  }

  const style = {
    border: '1px solid black',
    margin: '2px 0px 2px 0px'
  }

  return (
    <div className='blog' style={style}>
      {blog.title} {blog.author}
      <button style={hideWhenVisible} onClick={togglevisibility}>show</button>
      <button style={showWhenVisible} onClick={togglevisibility}>hide</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          <span>likes {blog.likes}</span>
          <button onClick={() => handleLikeBlog(blog)}>like</button>
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