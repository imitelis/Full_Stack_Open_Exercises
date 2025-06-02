const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog, Session } = require('../models')

const { tokenExtractor } = require('../middlewares/tokenExtractor')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        as: 'authored_blogs',
        attributes: { exclude: ['user_id'] }
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['user_id'] },
        through: {
          attributes: ['id', 'read']
        }
      }
    ]
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body

    if (!password || password.length < 3) {
      return res.status(400).json({
        error: 'User creation failed: username: Path `password` () is shorter than the minimum allowed length (3)'
      })
    }

    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({
        error: `Username ${username} is already taken.`
      });
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({
      username,
      name,
      passwordHash
    })

    const userData = user.get();
    delete userData.passwordHash;

    res.status(201).json(userData);
  } catch(err) {
    return res.status(400).json({ error: "User creation failed: something wrong happened" })
  }
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id,
    {
      include: [
        {
          model: Blog,
          as: 'authored_blogs',
          attributes: { exclude: ['user_id'] }
        },
        {
          model: Blog,
          as: 'readings',
          attributes: { exclude: ['user_id'] },
          through: {
            attributes: ['id', 'read'],
            where
          }
        }
      ]
    }
  )

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', tokenExtractor, async (req, res, next) => {
  try {
    const loggedUser = await User.findByPk(req.decodedToken.user_id)
    const userSession = await Session.findByPk(req.decodedToken.session_id)
    if (!loggedUser) {
      return res.status(404).json({ error: 'Logged user not found' })
    }
    if (!userSession) {
      return res.status(404).json({ error: 'User session not found' })
    }

    const user = await User.findOne({ where: { username: req.params.username } })
    if (user.id == loggedUser.id) {
      user.username = req.body.username; 
      await user.save()
      res.json(user)
    } else if (user.id != loggedUser.id) {
      res.status(403).json({ error: 'Forbidden' })
    } else if (!user) {
      res.status(404).json({ error: 'Username not found' })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router

