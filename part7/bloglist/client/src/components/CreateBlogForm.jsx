import { useState } from 'react'
import { Button } from '@mui/material'

import FieldInput from './FieldInput'
import useBlogs from '../hooks/useBlogs'

const CreateBlogForm = ({ user }) => {
  const { addBlog } = useBlogs()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }
    newBlog.user = {
      username: user.username,
      name: user.name,
      id: user.id,
    }

    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
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
      <FieldInput label="title" value={title} setValue={setTitle} />
      <FieldInput label="author" value={author} setValue={setAuthor} />
      <FieldInput label="url" value={url} setValue={setUrl} />

      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        create
      </Button>
    </form>
  )
}

export default CreateBlogForm
