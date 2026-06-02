import Blog from './Blog'

const Blogs = ({ blogs, handleLikeBlog, handleRemoveBlog, userId }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikeBlog={handleLikeBlog} handleRemoveBlog={handleRemoveBlog} userId={userId}/>
      )}
    </div>
  )
}

export default Blogs