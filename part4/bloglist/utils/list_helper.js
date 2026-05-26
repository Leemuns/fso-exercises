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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}