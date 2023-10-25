const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumLikes = blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)

  return sumLikes
}

const favouriteBlog = (blogs) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  if (sortedBlogs.length > 0) {
    const { title, author, likes } = sortedBlogs[0]
    return {
      title, author, likes
    }
  } else {
    return {}
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}