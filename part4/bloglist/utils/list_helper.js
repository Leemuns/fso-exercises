const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = blogList => {
  if (!blogList.length) {
    return 0
  }

  return blogList.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = blogList => {
  if (!blogList.length) {
    return null
  }

  return blogList.reduce((favorite, blog) => {
    return favorite.likes < blog.likes ? blog : favorite
  }, blogList[0])
}

const mostBlogs = blogList => {
  if (!blogList.length) {
    return null
  }

  return _(blogList)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .maxBy('blogs')
}

const mostLikes = blogList => {
  if (!blogList.length) {
    return null
  }

  return _(blogList)
    .groupBy('author')
    .map((likes, author) => { return {author, likes: _(likes).sumBy('likes')} })
    .maxBy('likes')
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}