const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate({ path: 'user', select: 'name username id' })
    res.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blogId = req.params.id
    const blog = await Blog.findById(blogId)
    
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const token = req.token
    const user = req.user

    const newBlog = new Blog({
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes === undefined ? 0 : body.likes,
      comments: [],
      user: user.id
    })

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token) {
      return res.status(401).json({ error: 'token missing' })
    }

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blogId = req.params.id
    const token = req.token
    const user = req.user

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token) {
      return res.status(401).json({ error: 'token missing' })
    }

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const existingBlog = await Blog.findById(blogId)

    if (!existingBlog) {
      res.status(404).json({ error: 'no blog' })
    }

    if (existingBlog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(blogId)

      await user.updateOne({ _id: user.id }, { $pull: { blogs: { $in: [blogId] } } })
      await user.save()

      res.status(204).end()
    } else {
      res.status(401).json({ error: 'unauthorized operation' })
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const blogId = req.params.id
    const token = req.token
    const user = req.user
    const body = req.body

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token) {
      return res.status(401).json({ error: 'token missing' })
    }

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const existingBlog = await Blog.findById(blogId)

    const updatedBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments
    }

    if (!existingBlog) {
      res.status(404).json({ error: 'no blog' })
    }

    await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true })
    res.status(200).json(updatedBlog)
    
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
