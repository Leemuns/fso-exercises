import Blogs from './Blogs'

const BlogsDisplay = ({ user, blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <Blogs blogs={blogs} />
    </div>
  )
}

export default BlogsDisplay