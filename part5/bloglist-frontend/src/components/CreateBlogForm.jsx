import FieldInput from './FieldInput'

const CreateBlogForm = ({ handleCreateBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <FieldInput name='title' value={title} setValue={setTitle} />
      <FieldInput name='author' value={author} setValue={setAuthor} />
      <FieldInput name='url' value={url} setValue={setUrl} />

      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm