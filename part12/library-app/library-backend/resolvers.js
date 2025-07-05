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
        // console.log("Book.countDocuments")
        const authorId = root._id
        let foundAuthor = await Author.findOne({ _id: authorId })
        const bookCount = foundAuthor.books.length
        return bookCount;
      }
    },
    Query: {
      authorCount: async (root, args) => Author.collection.countDocuments(),
      bookCount: async (root, args) => Book.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (!args.author && !args.genre) {
          // console.log('Book.find')
          let books = await Book.find({})
          return books;
        } else if (args.author) {
          let foundAuthor = await Author.findOne({ name: args.author })
          if (foundAuthor) {
            // console.log('Book.find')
            const booksByAuthor = await Book.find({ author: foundAuthor._id })
            return booksByAuthor;
          } else {
            return null;
          }
        } else if (args.genre) {
          // console.log('Book.find')
          let foundBooks = await Book.find({ genres: { $in: [args.genre] } })
          if (foundBooks) {
            return foundBooks;
          } else {
            return null;
          }
        } else if (args.author && args.genre) {
          let foundAuthor = await Author.findOne({ name: args.author })
          if (foundAuthor) {
            // console.log('Book.find')
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
            throw new GraphQLError(`error: not authenticated, please log in and try again`, {          
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
              foundAuthor.books.push(newBook._id)
              await foundAuthor.save()
              pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
              return newBook;
          } catch(error) {
            if (args.author.length < 4) {
              throw new GraphQLError(`error: author (${args.author}) is shorter than the minimum allowed length (4)`, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            } else if (args.title.length < 5) {
              throw new GraphQLError(`error: title (${args.title}) is shorter than the minimum allowed length (5)`, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            } else {
              throw new GraphQLError(`${error}`, {
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
            throw new GraphQLError(`error: not authenticated, please log in and try again`, {          
              extensions: {            
                code: 'BAD_USER_INPUT',          
              }        
            })
          }
  
          try {
            let updatedAuthor = await Author.findOne({ name: args.name })
            if (!updatedAuthor) {
              return null;
            } 
            
            if (args.setBornTo !== undefined) {
              updatedAuthor.born = args.setBornTo
              await updatedAuthor.save()
              return updatedAuthor;
            }
  
            return foundAuthor;
          } catch(error) {
            throw new GraphQLError(`${error}`, {
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
            throw new GraphQLError(`error: adding ${args.username} information failed`, {
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
              throw new GraphQLError(`error: wrong credentials or non-existing user`, {
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
            throw new GraphQLError(`${error}`, {
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