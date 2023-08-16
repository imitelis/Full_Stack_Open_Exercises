const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()

const jwt = require('jsonwebtoken')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connection to MongoDB:', error.message)
  })

/*
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]
*/

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

/*
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]
*/

/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type AddBookResponse {
    title: String!
    author: String!
  }

  type EditAuthorResponse {
    name: String!
    born: Int!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): AddBookResponse

    editAuthor(    
      name: String!    
      setBornTo: Int!  
    ): EditAuthorResponse

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Author: {    
    bookCount: async (root) => {
      const authorId = root._id;
      const authorBooks = await Book.countDocuments({ author: authorId });
      return authorBooks;
    }
  },
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({})
      if (!args.author && !args.genre) {
        return books
      } else if (args.author) {
        let foundAuthor = await Author.findOne({ name: args.author });
        if (foundAuthor) {
          const booksByAuthor = await Book.find({ author: foundAuthor._id });
          return booksByAuthor;
        } else {
          return null;
        }
      } else if (args.genre) {
        let foundBooks = await Book.find({ genres: { $in: [args.genre] } });
        if (foundBooks) {
          return foundBooks;
        } else {
          return null;
        }
      } else if (args.author && args.genre) {
        let foundAuthor = await Author.findOne({ name: args.author });
        if (foundAuthor) {
          const booksByAuthorAndGenre = await Book.find({ author: foundAuthor._id, genres: { $in: [args.genre] } });
          if (booksByAuthorAndGenre) {
            return booksByAuthorAndGenre;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
      addBook: async (root, args, { currentUser }) => {

        if (!currentUser) {        
          throw new GraphQLError('not authenticated', {          
            extensions: {            
              code: 'BAD_USER_INPUT',          
            }        
          })      
        }

        try {
            let foundAuthor = await Author.findOne({ name: args.author });
            if (!foundAuthor) {
              foundAuthor = await Author.create({ name: args.author, born: null });
            }
            const newBook = new Book({ title: args.title, published: args.published, genres: args.genres, author: foundAuthor._id });
            await newBook.save();
            return newBook;
        } catch(error) {
          if (args.author.length < 4) {
            throw new GraphQLError('Author name too short (less than 4 characters long)', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          } else if (args.title.length < 5) {
            throw new GraphQLError('Book title too short (less than 5 characters long)', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          } else {
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })          
          }
        }
      },
      editAuthor: async (root, args, { currentUser }) => {
        
        if (!currentUser) {        
          throw new GraphQLError('not authenticated', {          
            extensions: {            
              code: 'BAD_USER_INPUT',          
            }        
          })      
        }

        try {
          let foundAuthor = await Author.findOne({ name: args.name });
          if (!foundAuthor) {
            return null;
          } 
          
          if (args.setBornTo !== undefined) {
            foundAuthor.born = args.setBornTo
            let updatedAuthor = await foundAuthor.save()
            return updatedAuthor;
          }

          return foundAuthor;
        } catch(error) {
          throw new GraphQLError('Editing author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      },
      createUser: async (root, args) => {
        try  {
          const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre });
          await newUser.save();
          return newUser;
        } catch(error) {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      },
      login: async (root, args) => {
        try {
          const user = await User.findOne({ username: args.username })
          
          if ( !user || args.password !== 'secret' ) {
            throw new GraphQLError('Wrong credentials', {
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            })
          }
      
          const userForToken = {
            username: user.username,
            id: user._id,
          }
      
          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        } catch (error) {
          throw new GraphQLError('Login user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }
    }
  }

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})