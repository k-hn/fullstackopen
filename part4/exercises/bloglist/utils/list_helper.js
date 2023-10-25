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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const statCompilereducer = (accumulator, item) => {
    if (item.author in accumulator) {
      // hit
      accumulator[item.author].blogs += 1
    } else {
      // no hit
      accumulator[item.author] = { blogs: 1 }
    }
    return accumulator
  }

  const mostBlogsReducer = (accumulator, item) => {
    if (compiledBlogStats[item].blogs > accumulator.blogs) {

      accumulator = {
        author: item,
        blogs: compiledBlogStats[item].blogs
      }
    }
    return accumulator
  }

  const compiledBlogStats = blogs.reduce(statCompilereducer, {})
  const firstAuthor = Object.keys(compiledBlogStats)[0]
  const result = Object.keys(compiledBlogStats)
    .reduce(mostBlogsReducer, { author: firstAuthor, blogs: compiledBlogStats[firstAuthor].blogs })

  return result
}

// const mostLikes = (blogs) = {

// }

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}