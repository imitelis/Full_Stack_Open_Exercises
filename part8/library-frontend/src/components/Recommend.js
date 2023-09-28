import { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";

import { ME, BOOKS_BY_GENRE } from "../queries";

const Recommend = () => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("");

  const me_result = useQuery(ME, {
    refetchQueries: [{ query: ME }],
  });

  const books_by_genre_result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genre },
  });

  useEffect(() => {
    if (me_result.data && books_by_genre_result.data) {
      setGenre(me_result.data?.me?.favoriteGenre);
      setBooks(books_by_genre_result.data.allBooks);
    }
  }, [books, genre, books_by_genre_result.data, me_result.data]); // eslint-disable-line

  if (me_result.loading || books_by_genre_result.loading) {
    return (
      <div>
        <h2>Recommendations</h2>
        <em>loading...</em>
      </div>
    );
  }
  
  if (me_result.data === undefined || books_by_genre_result.data === undefined) {
    return (
      <div>
        <h2>Recommendations</h2>
        <em>lost connection...</em>
      </div>
    );
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{genre}</b>
      </p>
      {books.length === 0 ? (
        <em>none found...</em>
      ) : (
        <table>
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
      )}
    </div>
  );
};

export default Recommend;
