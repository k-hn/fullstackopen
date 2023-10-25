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


describe('most blogs', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('of a list is determined correctly', () => {
    const result = listHelper.mostBlogs(blogs)
    const expectedResult = { author: 'Robert C. Martin', blogs: 3 }

    expect(result).toEqual(expectedResult)
  })

  test('of an empty list is determined correctly', () => {
    const result = listHelper.mostBlogs([])

    expect(result).toEqual({})
  })
})