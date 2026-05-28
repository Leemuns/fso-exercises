const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(helper.initialBlogs)
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
      title: "New test note",
      author: "System",
      url: "https://idontexist.com/",
      likes: 150
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(r => r.title === newBlog.title)
    delete addedBlog.id

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert.deepStrictEqual(addedBlog, newBlog)
  })

  test('making an HTTP POST request with a newBlog missing the likes property will default to zero for it', async () => {
    const newBlog = {
      title: "New test note",
      author: "System",
      url: "https://idontexist.com/",
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(r => r.title === newBlog.title)

    assert.deepStrictEqual(addedBlog.likes, 0)
  })

  test('adding a newBlog without the title property will result in a response of 400 status code', async () => {
    const newBlog = {
      author: "System",
      url: "https://idontexist.com/",
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('adding a newBlog without the url property will result in a response of 400 status code', async () => {
    const newBlog = {
      title: "New test note",
      author: "System",
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting blogs', () => {
  test('delete', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(blog => blog.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtStart.length, helper.initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})