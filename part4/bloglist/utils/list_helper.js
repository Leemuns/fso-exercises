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

module.exports = {
  dummy,
  totalLikes
}