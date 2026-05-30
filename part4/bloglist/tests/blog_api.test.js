const assert = require('node:assert')
const { test, after, describe, beforeEach, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

before(async () => {
  const response = await api.post('/api/login')
    .send({ username: 'root', password: 'root123' })

  api.userToken = response.body.token

  const decodedToken = jwt.verify(api.userToken, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  api.user = await User.findById(decodedToken.id)
})

beforeEach(async () => {
  const initialBlogsRoot = helper.initialBlogs.map(blog => ({ ...blog, user: api.user.id }))

  await Blog.deleteMany()
  await Blog.insertMany(initialBlogsRoot)
})

describe('GET /api/blogs', () => {
  test('all blogs are returned as JSON', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)

    assert.strictEqual(response.body.length, 6)
  })

  test('unique identifier property of blog posts is named "id" and not "_id"', async () => {
    const response = await api.get('/api/blogs')

    assert(Object.keys(response.body[0]).includes('id'))
  })
})

describe('POST /api/blogs', () => {
  test('making an HTTP POST request to the /api/blogs increases total number of blogs by one and correct saves its content', async () => {
    const newBlog = {
      title: 'New test note',
      author: 'System',
      url: 'https://idontexist.com/',
      likes: 150
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${api.userToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(r => r.title === newBlog.title)
    delete addedBlog.id
    delete addedBlog.user

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert.deepStrictEqual(addedBlog, newBlog)
  })

  test('making an HTTP POST request with a newBlog missing the likes property will default to zero for it', async () => {
    const newBlog = {
      title: 'New test note',
      author: 'System',
      url: 'https://idontexist.com/',
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${api.userToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(r => r.title === newBlog.title)

    assert.deepStrictEqual(addedBlog.likes, 0)
  })

  test('adding a new blog without the title property will result in a response of 400 status code', async () => {
    const newBlog = {
      author: 'System',
      url: 'https://idontexist.com/',
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${api.userToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('adding a new blog without the url property will result in a response of 400 status code', async () => {
    const newBlog = {
      title: 'New test note',
      author: 'System',
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${api.userToken}`)
      .send(newBlog)
      .expect(400)
  })

  test('adding a new blog without user token will result in error response 401', async () => {
    const newBlog = {
      title: 'New test note',
      author: 'System',
      url: 'https://idontexist.com/',
      likes: 150
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('deleting blogs', () => {
  test('delete', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${api.userToken}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(blog => blog.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtStart.length, helper.initialBlogs.length)
  })
})

describe('putting blogs', () => {
  test('updating likes', async () => {
    const blogToUpdate = await helper.firstBlogInDb()
    const newLikeValue = 150

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: newLikeValue })
      .expect(204)

    const updatedBlogActual = await helper.firstBlogInDb()

    const updatedBlogExpected = blogToUpdate
    updatedBlogExpected.likes = newLikeValue

    assert.deepStrictEqual(updatedBlogActual, updatedBlogExpected)
  })

  test('putting a blog that does not exist', async () => {
    const newBlog = {
      title: 'New test note',
      author: 'Server',
      url: 'https://idontexist.com/',
      likes: 0
    }

    const blogsAtStart = await helper.blogsInDb()

    const nonExistingId = await helper.nonExistingId()
    const putResponse = await api.put(`/api/blogs/${nonExistingId}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = putResponse.body
    delete addedBlog.id

    assert.deepStrictEqual(addedBlog, newBlog)
    assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})