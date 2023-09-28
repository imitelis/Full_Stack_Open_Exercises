import { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

import { useApolloClient, useSubscription, useQuery } from "@apollo/client";

import { ALL_BOOKS, BOOK_ADDED, ME } from "./queries";

import { NotificationBlue, NotificationRed } from "./components/Notification";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import Recommend from "./components/Recommend";
import LoginForm from "./components/LoginForm";

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const client = useApolloClient();

  const me_result = useQuery(ME, {
    refetchQueries: [{ query: ME }],
  });

  useEffect(() => {
    if (me_result.data) {
      // console.log(me_result.data.me)
      setUser(me_result.data.me);
    } else {
      setUser(null);
    }
  }, [user, me_result.data]); // eslint-disable-line

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      // console.log(data)
      const addedBook = data.data.bookAdded;
      setSuccessMessage(
        `new book '${addedBook.title}' by '${addedBook.author}' was added`,
      );
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const loggedTokenString = window.localStorage.getItem("loggedLibraryToken");
    if (loggedTokenString) {
      setToken(loggedTokenString);
    }
  }, []);

  const logout = () => {
    setSuccessMessage(`good-bye ${user?.username}!`);
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate("/login");
  };

  if (!token) {
    return (
      <div>
        <h1>Library</h1>
        <NotificationBlue message={successMessage} />
        <NotificationRed message={errorMessage} />
        <div>
          <Link to="/authors">
            <button>authors</button>
          </Link>
          <Link to="/books">
            <button>books</button>
          </Link>
          <Link to="/login">
            <button>login</button>
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Books />} />
          <Route
            path="/authors"
            element={
              <Authors
                token={token}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route path="/books" element={<Books />} />
          <Route
            path="/login"
            element={
              <LoginForm
                setToken={setToken}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
        </Routes>
      </div>
    );
  }

  return (
    <div>
      <h1>Library</h1>
      <div>
        <NotificationBlue message={successMessage} />
        <NotificationRed message={errorMessage} />
        <Link to="/authors">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        <Link to="/addbook">
          <button>add book</button>
        </Link>
        <Link to="/recommend">
          <button>recommend</button>
        </Link>
        <button onClick={logout}>logout</button>
      </div>

      <Routes>
        <Route path="/" element={<Books />} />
        <Route
          path="/authors"
          element={
            <Authors
              token={token}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route path="/books" element={<Books />} />
        <Route
          path="/addbook"
          element={<BookForm setErrorMessage={setErrorMessage} />}
        />
        <Route path="/recommend" element={<Recommend user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
