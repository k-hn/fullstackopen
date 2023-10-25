const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumLikes = blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)

  return sumLikes
}

module.exports = {
  dummy,
  totalLikes
}