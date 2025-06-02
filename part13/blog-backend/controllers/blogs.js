const { Op } = require('sequelize')
const router = require('express').Router()

const { Blog, User, Session } = require('../models')

const { blogFinder } = require('../middlewares/blogFinder')
const { tokenExtractor } = require('../middlewares/tokenExtractor')

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const loggedUser = await User.findByPk(req.decodedToken.user_id)
    const userSession = await Session.findByPk(req.decodedToken.session_id)
    if (!loggedUser) {
      return res.status(404).json({ error: 'Logged user not found' })
    }
    if (!userSession) {
      return res.status(404).json({ error: 'User session not found' })
    }

    const blog = await Blog.create({...req.body, likes: 0, user_id: loggedUser.id, created_at: new Date(), updated_at: new Date()})

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
    attributes: { exclude: ['user_id'] },
    include: {
      model: User,
      as: 'posted_by',
      attributes: ['username', 'name']
    },
    where,
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {  
  try {
    if (req.blog) {
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    // console.log(req.blog.id)
    const loggedUser = await User.findByPk(req.decodedToken.user_id)
    const userSession = await Session.findByPk(req.decodedToken.session_id)
    if (!loggedUser) {
      return res.status(404).json({ error: 'Logged user not found' })
    }
    if (!userSession) {
      return res.status(404).json({ error: 'User session not found' })
    }

    const blog = await Blog.findByPk(req.blog.id)
    if (!blog.id) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    if (blog.user_id != loggedUser.id) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    
    await blog.destroy()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    const loggedUser = await User.findByPk(req.decodedToken.user_id)
    const userSession = await Session.findByPk(req.decodedToken.session_id)
    if (!loggedUser) {
      return res.status(404).json({ error: 'Logged user not found' })
    }
    if (!userSession) {
      return res.status(404).json({ error: 'User session not found' })
    }

    if (req.blog) {
      req.blog.likes = req.blog.likes + 1; 
      await req.blog.save()
      res.json({"likes": req.blog.likes})
    } else {
      res.status(404).json({ error: 'Blog not found' })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router