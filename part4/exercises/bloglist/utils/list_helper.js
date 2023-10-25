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
  const result = Object.keys(compiledBlogStats)
    .reduce(mostBlogsReducer, { author: 'unknown', blogs: -1 })

  return result.author === 'unknown' ? {} : result
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}