const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')

const { User, Session } = require('../models')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = await User.findOne({ where: { username: username } });
  const session = await Session.create({ userId: user.id });

  const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

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

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router