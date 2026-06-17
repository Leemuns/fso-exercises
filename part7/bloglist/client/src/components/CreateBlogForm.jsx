import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import FieldInput from './FieldInput'

const CreateBlogForm = ({ createBlog, userId }) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()

    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')

    navigate('/')
  }

  if (!userId) {
    return (
      <div>
        <p>User not logged in</p>
      </div>
    )
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <FieldInput label='title' value={title} setValue={setTitle} />
      <FieldInput label='author' value={author} setValue={setAuthor} />
      <FieldInput label='url' value={url} setValue={setUrl} />

      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        create
      </Button>
    </form>
  )
}

export default CreateBlogForm