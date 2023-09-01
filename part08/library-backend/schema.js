/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
  type Author {
    id: ID!
    name: String!
    born: Int
    books: [String!]!
    bookCount: Int
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
  }

  type AddBookResponse {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
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
    allGenres: [String!]!
    me: User
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
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

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
