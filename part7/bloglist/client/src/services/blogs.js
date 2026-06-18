const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('Failed to fetch blogs')
  return await response.json()
}

const create = async (newBlog) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(newBlog),
  })
  if (!response.ok) throw new Error('Failed to create new blog')
  return await response.json()
}

const createComment = async (blogId, comment) => {
  const response = await fetch(`${baseUrl}/${blogId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({ comment }),
  })
  if (!response.ok) throw new Error('Failed to create new comment')
  const newBlog = await response.json()
  return newBlog
}

const remove = async (blogId) => {
  const response = await fetch(`${baseUrl}/${blogId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  })
  if (!response.ok) throw new Error('Failed to delete blog')
}

const update = async (blogId, newBlog) => {
  const response = await fetch(`${baseUrl}/${blogId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(newBlog),
  })
  if (!response.ok) throw new Error('Failed to update blog')
}

export default { setToken, getAll, create, createComment, remove, update }
