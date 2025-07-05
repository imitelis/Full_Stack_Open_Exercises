const { WebSocketServer } = require('ws')
const { ApolloServer } = require('@apollo/server')
const { useServer } = require('graphql-ws/lib/use/ws')

const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const express = require('express')
const cors = require('cors')
const http = require('http')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()

const jwt = require('jsonwebtoken')

const User = require('./models/User')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to', MONGODB_URI)

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }

  // mongoose.set('debug', true)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ]
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {    
        const auth = req ? req.headers.authorization : null    
        if (auth && auth.startsWith('Bearer ')) {      
          const decodedToken = jwt.verify(        
            auth.substring(7), process.env.JWT_SECRET      
            )      
            const currentUser = await User        
            .findById(decodedToken.id)
            return { currentUser }    
          }  
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () => 
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()