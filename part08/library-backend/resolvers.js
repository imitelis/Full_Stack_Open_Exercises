const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require('graphql')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const jwt = require('jsonwebtoken')

const resolvers = {
    Book: {
      author: async (root, args) => {
        const authorId = root.author;
        let foundAuthor = await Author.findOne({ _id: authorId })
        return foundAuthor.name;
      }
    },
    Author: {    
      bookCount: async (root, args) => {
        const authorId = root._id
        let authorCount = await Book.countDocuments({ author: authorId })
        return authorCount;
      }
    },
    Query: {
      authorCount: async (root, args) => Author.collection.countDocuments(),
      bookCount: async (root, args) => Book.collection.countDocuments(),
      allBooks: async (root, args) => {
        let books = await Book.find({})
        if (!args.author && !args.genre) {
          return books;
        } else if (args.author) {
          let foundAuthor = await Author.findOne({ name: args.author })
          if (foundAuthor) {
            const booksByAuthor = await Book.find({ author: foundAuthor._id })
            return booksByAuthor;
          } else {
            return null;
          }
        } else if (args.genre) {
          let foundBooks = await Book.find({ genres: { $in: [args.genre] } })
          if (foundBooks) {
            return foundBooks;
          } else {
            return null;
          }
        } else if (args.author && args.genre) {
          let foundAuthor = await Author.findOne({ name: args.author })
          if (foundAuthor) {
            const booksByAuthorAndGenre = await Book.find({ author: foundAuthor._id, genres: { $in: [args.genre] } })
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
      allAuthors: async (root, args) => await Author.find({}),
      allGenres: async (root, args) => await Book.distinct('genres'),
      me: (root, args, context) => {
        return context.currentUser;
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
              let foundAuthor = await Author.findOne({ name: args.author })
              if (!foundAuthor) {
                foundAuthor = await Author.create({ name: args.author, born: null })
              }
              const newBook = new Book({ title: args.title, published: args.published, genres: args.genres, author: foundAuthor._id })
              await newBook.save()
              pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
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
            let foundAuthor = await Author.findOne({ name: args.name })
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
            const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            await newUser.save()
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
      },
      Subscription: {    
        bookAdded: {      
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')    
        },  
      }
    }

    module.exports = resolvers