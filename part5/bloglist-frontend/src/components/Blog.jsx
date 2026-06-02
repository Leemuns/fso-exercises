import { useState } from 'react'

import Togglable from './Togglable'

const Blog = ({ blog, handleLike }) => {
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
    <div style={style}>
      {blog.title} {blog.author}
      <button style={hideWhenVisible} onClick={togglevisibility}>show</button>
      <button style={showWhenVisible} onClick={togglevisibility}>hide</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

export default Blog