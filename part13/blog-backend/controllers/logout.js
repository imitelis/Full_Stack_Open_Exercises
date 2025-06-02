const router = require('express').Router()

const { User, Session } = require('../models')

const { tokenExtractor } = require('../middlewares/tokenExtractor')

router.delete('/', tokenExtractor, async (req, res) => {
  try {
    const loggedUser = await User.findByPk(req.decodedToken.user_id)
    const userSession = await Session.findByPk(req.decodedToken.session_id)
    if (!loggedUser) {
      return res.status(404).json({ error: 'Logged user not found' })
    }
    if (!userSession) {
      return res.status(404).json({ error: 'User session not found' })
    }

    await userSession.destroy()

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router