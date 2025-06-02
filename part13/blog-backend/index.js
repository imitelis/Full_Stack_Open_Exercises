const express = require('express')

const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { errorHandler } = require('./middlewares/errorHandler')
const { unknownEndpoint } = require('./middlewares/unknownEndpoint')

const authorsRouter = require('./controllers/authors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const reaingsRouter = require('./controllers/reading_lists')

app.use(express.json())

app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/reading_lists', reaingsRouter)

app.use(errorHandler)
app.use(unknownEndpoint)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()