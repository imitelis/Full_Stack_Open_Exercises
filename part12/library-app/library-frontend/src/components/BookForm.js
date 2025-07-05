import { useState } from "react";

import { useMutation } from "@apollo/client";

import { updateCache } from "../App";

import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES } from "../queries";

const BookForm = ({ setErrorMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        setErrorMessage(error.graphQLErrors[0].message);
      }
    },
    update: (cache, response) => {
      // console.log(cache)
      // console.log(response)
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
    },
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_GENRES }],
  });

  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    if (genre === "") {
      setErrorMessage(`error: genre (${genre}) is required`);
    } else if (genre !== "") {
      setGenres(genres.concat(genre));
    }
    setGenre("");
  };

  return (
    <div>
      <h2>New Book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default BookForm;
