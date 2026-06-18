import { Button } from '@mui/material'

import FieldInput from './FieldInput'
import useBlogs from '../hooks/useBlogs'
import useField from '../hooks/useField'

const CreateBlogForm = ({ user }) => {
  const { addBlog } = useBlogs()

  const title = useField('title', 'create')
  const author = useField('author', 'create')
  const url = useField('url', 'create')

  const handleAddBlog = (event) => {
    event.preventDefault()

    const formData = {
      title: event.target.elements.title.value,
      author: event.target.elements.author.value,
      url: event.target.elements.url.value,
    }
    const { username, name, id } = user
    addBlog({ ...formData, user: { username, name, id } })

    title.clear()
    author.clear()
    url.clear()
  }

  if (!user.id) {
    return (
      <div>
        <p>User not logged in</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleAddBlog}>
      <h2>Create new</h2>
      <FieldInput {...title} />
      <FieldInput {...author} />
      <FieldInput {...url} />

      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        create
      </Button>
    </form>
  )
}

export default CreateBlogForm
