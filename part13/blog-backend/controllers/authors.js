const seq = require('sequelize')
const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const attributes = [
      'author',
      [seq.fn('COUNT', seq.col('id')), 'articles'],
      [seq.fn('SUM', seq.col('likes')), 'likes']
    ]
    
    const blogs = await Blog.findAll({
      attributes,
      group: ['author'],
      order: [['likes', 'DESC']]
    })
    
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})

module.exports = router