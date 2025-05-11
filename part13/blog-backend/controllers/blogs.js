const { Op } = require('sequelize')
const router = require('express').Router()

const { Blog, User } = require('../models')

const { blogFinder } = require('../middlewares/blogFinder')
const { tokenExtractor } = require('../middlewares/tokenExtractor')

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    // const blog = await Blog.create(req.body)
    const user = await User.findByPk(req.decodedToken.id)    
    const blog = await Blog.create({...req.body, likes: 0, userId: user.id, date: new Date()})

    res.json(blog)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res) => {
  const where = {}
  
  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } }
    ];
  }  
  
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username', 'name']
    },
    where,
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {  
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    console.log(req.blog.id)
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.blog.id)

    if (!blog.id) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    
    if (blog.userId != user.id) {
      return res.status(403).json({ error: 'Forbidden: Invalid user' })
    }
    
    await req.blog.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.blog.likes + 1; 
    await req.blog.save()
    res.json({"likes": req.blog.likes})
  } else {
    res.status(404).end()
  }
})

module.exports = router