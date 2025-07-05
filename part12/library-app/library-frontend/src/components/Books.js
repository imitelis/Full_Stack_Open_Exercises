import { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";

import { ALL_BOOKS, BOOKS_BY_GENRE, ALL_GENRES } from "../queries";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("all genres");

  const books_result = useQuery(ALL_BOOKS);

  const books_by_genre_result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genre },
  });

  const genres_result = useQuery(ALL_GENRES);

  useEffect(() => {
    if (genres_result.data) {
      setGenres(genres_result.data.allGenres);
    }
  }, [genres, genres_result.data]);

  useEffect(() => {
    if (genre === "all genres" && books_result.data) {
      setBooks(books_result.data.allBooks);
    } else if (genre !== "all genres" && books_by_genre_result.data) {
      setBooks(books_by_genre_result.data.allBooks);
    }
  }, [genre, books_result.data, books_by_genre_result.data]); // eslint-disable-line

  if (books_result.loading || genres_result.loading) {
    return (
      <div>
        <h2>Books</h2>
        <em>loading...</em>
      </div>
    );
  }

  if (books_result.data === undefined || genres_result.data === undefined) {
    return (
      <div>
        <h2>Books</h2>
        <em>lost connection...</em>
      </div>
    );
  }

  // const genres = genres_result.data.allGenres

  return (
    <div>
      <h2>Books</h2>
      <p>
        in genre <b>{genre}</b>
      </p>
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
      <div>
        {genres.map((genre, index) => (
          <button
            key={index}
            onClick={() => {
              setGenre(genre);
            }}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={() => {
            setGenre("all genres");
          }}
        >
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
