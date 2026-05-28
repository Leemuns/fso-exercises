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

after(async () => {
  await mongoose.connection.close()
})