const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    if (password.length < 3) {
      res.status(400).json({ error: 'User validation failed: username: Path `password` () is shorter than the minimum allowed length (3).' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
    res.json(users)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
