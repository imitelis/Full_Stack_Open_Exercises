const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({    
    include: {      
        model: Blog,
        attributes: { exclude: ['userId'] }
    }  
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body

    if (!password || password.length < 3) {
      return res.status(400).json({
        error: 'User creation failed: username: Path `password` () is shorter than the minimum allowed length (3).'
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
  } catch(error) {
    return res.status(400).json({ error: "User creation failed: something wrong happened." })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.username = req.body.username; 
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router