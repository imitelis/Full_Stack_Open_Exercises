const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')

const { User, Session } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const user = await User.findOne({ where: { username: username } })
    const session = await Session.create({ userId: user.id })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'Invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      user_id: user.id,
      session_id: session.id
    }

    const token = jwt.sign(
      userForToken,
      SECRET
    )

    user.disabled = false
    await user.save()

    res
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (err) {
    next(err)
  }
})

module.exports = router