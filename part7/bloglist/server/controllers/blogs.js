const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog(body)
  blog.user = user._id

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const userId = request.user.id

  if (blog.user.toString() !== userId.toString()) {
    return response
      .status(403)
      .json({ error: 'Not allowed to delete notes created by other users' })
  }

  await blog.deleteOne()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  }

  blog.likes = request.body.likes

  await blog.save()
  response.status(204).end()
})

module.exports = blogsRouter
