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

usersRouter.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const existingUser = await User.findById(userId)

    if (!existingUser) {
      res.status(404).json({ error: 'no user' })
    }

    await User.findByIdAndRemove(userId)
    res.status(204).end()
    
  } catch (exception) {
    next(exception)
  }
})

usersRouter.put('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const { username, name, password } = req.body

    if (password.length < 3) {
      res.status(400).json({ error: 'User validation failed: username: Path `password` () is shorter than the minimum allowed length (3).' })
    }

    const existingUser = await User.findById(userId)

    if (!existingUser) {
      res.status(404).json({ error: 'no user' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const updatedUser = {
      username,
      name,
      passwordHash
    }

    await User.findByIdAndUpdate(userId, updatedUser, { new: true })
    res.status(200).json(updatedUser)
    
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
