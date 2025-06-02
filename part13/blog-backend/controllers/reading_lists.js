const router = require('express').Router()

const { User, Blog, ReadingList, Session } = require('../models')

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

    const { userId, blogId } = req.body
    if (!userId || !blogId) {
      return res.status(400).json({ error: 'Missing userId or blogId' })
    }

    const user = await User.findByPk(userId)
    const blog = await Blog.findByPk(blogId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    if (user.id != loggedUser.id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const readingList = await ReadingList.create({
      userId: userId,
      blogId: blogId,
      read: false
    })
  
    res.json(readingList)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const readingList = await ReadingList.findByPk(req.params.id)
    const loggedUser = await User.findByPk(req.decodedToken.user_id)
    const userSession = await Session.findByPk(req.decodedToken.session_id)
    if (!readingList) {
      return res.status(404).json({ error: 'Reading list not found' })
    }
    if (!loggedUser) {
      return res.status(404).json({ error: 'Logged user not found' })
    }
    if (!userSession) {
      return res.status(404).json({ error: 'User session not found' })
    }
    if (loggedUser.id != readingList.userId) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const { read } = req.body
    readingList.read = read; 
    await readingList.save()
    res.json(readingList)    
  } catch (err) {
    next(err)
  }
})

module.exports = router