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
  if (blogs.length === 0) {
    return {}
  }

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  const { title, author, likes } = sortedBlogs[0]
  return {
    title,
    author,
    likes
  }

}

const mostBlogs = (blogs) => {
  // return empty object if blog array is empty
  if (blogs.length === 0) {
    return {}
  }

  const blogsReducer = (acc, blog) => {
    const searchIndex = acc.findIndex(item => item.author === blog.author)
    if (searchIndex !== -1) {
      // hit
      acc[searchIndex].blogs += 1
    } else {
      acc.push({
        author: blog.author,
        blogs: 1
      })
    }
    return acc
  }

  // reduce and sort entries in descending order of number of blogs
  const mostBlogsArray = blogs
    .reduce(blogsReducer, [])
    .toSorted((a, b) => b.blogs - a.blogs)

  return mostBlogsArray[0]
}

const mostLikes = (blogs) => {
  // return empty object if blog array is empty
  if (blogs.length === 0) {
    return {}
  }

  const likesReducer = (acc, blog) => {
    const searchIndex = acc.findIndex(item => item.author === blog.author)
    if (searchIndex !== -1) {
      // hit
      acc[searchIndex].likes += blog.likes
    } else {
      // miss
      acc.push({
        author: blog.author,
        likes: blog.likes
      })
    }
    return acc
  }

  // reduce and sort entries in descending order of number of likes
  const mostLikesArray = blogs
    .reduce(likesReducer, [])
    .toSorted((a, b) => b.likes - a.likes)

  return mostLikesArray[0]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}