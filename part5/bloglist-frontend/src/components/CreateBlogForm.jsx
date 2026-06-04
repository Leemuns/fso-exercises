import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      <h2>create new</h2>
      <FieldInput name='title' value={title} setValue={setTitle} />
      <FieldInput name='author' value={author} setValue={setAuthor} />
      <FieldInput name='url' value={url} setValue={setUrl} />

      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm