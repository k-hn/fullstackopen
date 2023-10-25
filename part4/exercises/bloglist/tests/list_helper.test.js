const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithNoBlogs = []
  const listWithOneBlog = [
    {
      'title': 'The Case of a Curious SQL Query',
      'author': 'Justin Jaffray',
      'url': 'https://buttondown.email/jaffray/archive/the-case-of-a-curious-sql-query/',
      'likes': 21,
      'id': '6538def56643a9cd5791bbdf'
    }
  ]
  const listWithMultipleBlogs = [
    {
      'title': 'Embeddings: What they are and why they matter',
      'author': 'Simon Willison',
      'url': 'https://simonwillison.net/2023/Oct/23/embeddings/',
      'likes': 228,
      'id': '6538dd33e01ab90945153431'
    },
    {
      'title': 'On Learning Compilers and Creating Programming Languages',
      'author': 'Craig Stuntz',
      'url': 'https://www.craigstuntz.com/posts/2023-10-13-learning-compilers-and-programming-languages.html',
      'likes': 41,
      'id': '6538deb76643a9cd5791bbdd'
    },
    {
      'title': 'The Case of a Curious SQL Query',
      'author': 'Justin Jaffray',
      'url': 'https://buttondown.email/jaffray/archive/the-case-of-a-curious-sql-query/',
      'likes': 21,
      'id': '6538def56643a9cd5791bbdf'
    }
  ]
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)

    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)

    expect(result).toBe(21)
  })

  test('of a bigger list is calculated right', () => {


    const result = listHelper.totalLikes(listWithMultipleBlogs)

    const sumOfLikes = 290
    expect(result).toBe(sumOfLikes)
  })
})

describe('favourite blog', () => {
  const listWithNoBlogs = []
  const listWithOneBlog = [
    {
      'title': 'The Case of a Curious SQL Query',
      'author': 'Justin Jaffray',
      'url': 'https://buttondown.email/jaffray/archive/the-case-of-a-curious-sql-query/',
      'likes': 21,
      'id': '6538def56643a9cd5791bbdf'
    }
  ]
  const listWithMultipleBlogs = [
    {
      'title': 'Embeddings: What they are and why they matter',
      'author': 'Simon Willison',
      'url': 'https://simonwillison.net/2023/Oct/23/embeddings/',
      'likes': 228,
      'id': '6538dd33e01ab90945153431'
    },
    {
      'title': 'On Learning Compilers and Creating Programming Languages',
      'author': 'Craig Stuntz',
      'url': 'https://www.craigstuntz.com/posts/2023-10-13-learning-compilers-and-programming-languages.html',
      'likes': 41,
      'id': '6538deb76643a9cd5791bbdd'
    },
    {
      'title': 'The Case of a Curious SQL Query',
      'author': 'Justin Jaffray',
      'url': 'https://buttondown.email/jaffray/archive/the-case-of-a-curious-sql-query/',
      'likes': 21,
      'id': '6538def56643a9cd5791bbdf'
    }
  ]

  test('of a list is determined correctly', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs)

    const expectedResult = {
      'title': 'Embeddings: What they are and why they matter',
      'author': 'Simon Willison',
      'likes': 228,
    }
    expect(result).toEqual(expectedResult)
  })

  test('of a list of one returns that blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)

    const expectedResult = {
      'title': 'The Case of a Curious SQL Query',
      'author': 'Justin Jaffray',
      'likes': 21,
    }

    expect(result).toEqual(expectedResult)
  })

  test('of a list of zero blogs returns an empty object', () => {
    const result = listHelper.favouriteBlog(listWithNoBlogs)

    expect(result).toEqual({})
  })
})