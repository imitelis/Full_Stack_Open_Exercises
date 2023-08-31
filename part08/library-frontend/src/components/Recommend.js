import { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ME } from '../queries'

const Recommend = () => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('');

  const books_result = useQuery(ALL_BOOKS, {
    refetchQueries: [ { query: ALL_BOOKS } ]
  })

  const me_result = useQuery(ME, {
    refetchQueries: [ { query: ME } ]
  })

  useEffect(() => {
    if (me_result.data &&  books_result.data) {
        // console.log(me_result.data.me)
        setGenre(me_result.data.me.favoriteGenre)
        setBooks(books_result.data.allBooks.filter(book =>
            book.genres.includes(genre)
        ))
    }
  }, [genre, books_result.data, me_result.data]); // eslint-disable-line

  if (books_result.loading || me_result.loading) {
    return (
      <div>
      <h2>Recommend</h2>
      <em>loading...</em>
      </div>
      )
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <b>{genre}</b></p>
      {books.length === 0 
      ? <em>none found...</em>
      : <table>
      <tbody>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((book, index) => (
          <tr key={index}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
      }
    </div>
  )
}

export default Recommend
