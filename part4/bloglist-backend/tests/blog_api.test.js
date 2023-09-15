const app = require('../app')

const supertest = require('supertest')
const api = supertest(app)

const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('When there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  }, 10000)

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all of blogs are returned', async () => {
    await api
      .get('/api/blogs')
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('identifier property of the blog is id and it is unique', async () => {
    const res = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const ids = res.body.map((blog) => blog.id)
    const idSet = new Set()

    for (const id of ids) {
      expect(id).toBeDefined()
      expect(idSet.has(id)).toBeFalsy()
      idSet.add(id)
    }
  })
})

describe('Viewing a specific blog', () => {
  test('getting a blog, succeeds with statuscode 200 OK with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const res = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toEqual(blogToView)
  })

  test('getting a blog fails, returns statuscode 404 Not Found if id doesnt exists', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('getting a blog fails, returns statuscode 400 Bad Request if id is not valid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('Posting a blog', () => {
  let token = ''
  beforeEach(async () => {
    await User.deleteMany({})
    const password = 'mypassword'
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = await new User({ username: 'myusername', passwordHash }).save()
    const userForToken = {
      username: user.username,
      id: user._id
    }
    token = jwt.sign(userForToken, process.env.SECRET)
  }, 10000)

  test('authorized user succeeds, returns statuscode 201 Success with a valid blog post', async () => {
    const newBlog = {
      title: 'Bird culture',
      author: 'Lewis R. Moon',
      url: 'http://blog_processing.com/',
      likes: 1,
      __v: 0
    }

    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(parseInt(blogsAtEnd.length - blogsAtStart.length)).toBe(1)
  })

  test('authorized user succeeds, returns statuscode 201 Success if there is no likes key', async () => {
    const newBlog = {
      title: 'Bird culture',
      author: 'Lewis R. Moon',
      url: 'http://blog_processing.com/',
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(parseInt(blogsAtEnd[blogsAtEnd.length - 1].likes)).toBe(0)
  })

  test('authorized user fails, returns statuscode 400 Bad Request if there is no title key', async () => {
    const newBlog = {
      author: 'Lewis R. Moon',
      url: 'http://blog_processing.com/',
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(parseInt(blogsAtEnd[blogsAtEnd.length - 1].title)).toBe(NaN)
  })

  test('authorized user fails, returns statuscode 400 Bad Request if there is no url key in request', async () => {
    const newBlog = {
      title: 'Bird culture',
      author: 'Lewis R. Moon',
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(parseInt(blogsAtEnd[blogsAtEnd.length - 1].url)).toBe(NaN)
  })

  test('unauthorized user fails, returns statuscode 401 Unauthorized with valig blog post', async () => {
    const newBlog = {
      title: 'Bird culture',
      author: 'Lewis R. Moon',
      url: 'http://blog_processing.com/',
      likes: 1,
      __v: 0
    }

    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', 'Bearer wrongtoken')
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('Deleting a blog', () => {
  let token = ''
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const password = 'mypassword'
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = await new User({ username: 'myusername', passwordHash }).save()
    const userForToken = {
      username: user.username,
      id: user._id
    }

    token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'Deleting is coming',
      author: 'H. Kling Rumm',
      url: 'http://blog_deleting.net/',
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('authorized user succeeds, returns statuscode 204 OK if id and token are valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('authorized user fails, returns statuscode 404 Not Found if blog not longer exist', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const validNonexistingId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${validNonexistingId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(404)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('authorized user fails, return statuscode 400 Bad Request if id is not valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const invalidId = '64z4zcz7z9bz5z0ze5ac1b8z'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('unauthorized user fails, returns statuscode 401 Unauthorized with valid blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', 'Bearer wrongtoken')
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(blogToDelete.title)
  })
})

describe('Updating a blog', () => {
  let token = ''
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const password = 'mypassword'
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = await new User({ username: 'myusername', passwordHash }).save()
    const userForToken = {
      username: user.username,
      id: user._id
    }

    token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'Delete coming',
      author: 'H. Kling Rumm',
      url: 'http://blog_deleting.net/',
      likes: 2,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('authorized user succeeds, returns statuscode 200 OK if id and token are valid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: blogsAtStart[0].likes + 5,
      id: blogsAtStart[0].id,
      __v: 0
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .set('authorization', `Bearer ${token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes + 5)
  })

  test('authorized user fails, returns statuscode 404 Not Found if blog not longer exist', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const validNonexistingId = await helper.nonExistingId()

    const blogToUpdate = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: blogsAtStart[0].likes + 5,
      id: validNonexistingId,
      __v: 0
    }

    const res = await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send(blogToUpdate)
      .set('authorization', `Bearer ${token}`)
      .expect(404)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const blogsAtEnd = await helper.blogsInDb()
    expect(res.body.error).toContain('no blog')
    expect(blogsAtEnd[0].id.toString()).toEqual(blogsAtStart[0].id.toString())
  })

  test('authorized user fails, returns statuscode 400 Bad Request if id is not valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const invalidId = '64z4zcz7z9bz5z0ze5ac1b8z'

    const blogToUpdate = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: blogsAtStart[0].likes + 5,
      id: invalidId,
      __v: 0
    }

    await api
      .delete(`/api/blogs/${invalidId}`)
      .send(blogToUpdate)
      .set('authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].id.toString()).toEqual(blogsAtStart[0].id.toString())
  })

  test('unauthorized user succeeds, returns statuscode 200 OK if id is valid but doesnt owns blog', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: blogsAtStart[0].likes + 5,
      id: blogsAtStart[0].id,
      __v: 0
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .set('authorization', `Bearer ${token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes + 5)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
