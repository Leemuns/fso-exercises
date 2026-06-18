import { Link } from 'react-router-dom'
import useBlogs from '../hooks/useBlogs'

const BlogList = () => {
  const { blogs, isPending } = useBlogs()

  if (isPending) {
    return <div>Loading blogs...</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
