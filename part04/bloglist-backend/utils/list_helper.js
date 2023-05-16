const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let likesCount = 0
  for (let i = 0; i < blogs.length; i++) {
    likesCount += blogs[i].likes
  }
  return likesCount
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let bestBlog = blogs[0]
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes >= bestBlog.likes) {
      bestBlog = blogs[i]
    }
  }

  const bestBlogs = blogs.filter(blog => blog.likes === bestBlog.likes).map(({ _id, title, author }) => ({ _id, title, author }))

  return bestBlogs
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorBlogs = _.groupBy(blogs, 'author')
  const maxCount = _.max(_.map(authorBlogs, 'length'))

  const topAuthors = _.chain(authorBlogs)
    .filter((authors) => authors.length === maxCount)
    .map((authors) => ({ author: authors[0].author, blogs: authors.length }))
    .value()

  return topAuthors
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = _.groupBy(blogs, 'author')
  const authorLikeSums = []

  _.forEach(authorLikes, (blogs, author) => {
    const likesSum = _.sumBy(blogs, 'likes')
    authorLikeSums.push({ author, likes: likesSum })
  })

  const sortedByLikes = _.orderBy(authorLikeSums, 'likes', 'desc')

  return [sortedByLikes[0]]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
