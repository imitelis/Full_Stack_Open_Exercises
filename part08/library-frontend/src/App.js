import { useState, useEffect } from 'react'
import { Link, Routes, Route, useNavigate } from "react-router-dom";

import { useApolloClient, useSubscription } from '@apollo/client'

import { BOOK_ADDED, ALL_BOOKS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import AddBook from './components/AddBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')
  
  const navigate = useNavigate();
  
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      // console.log(data)
      const addedBook = data.data.bookAdded

      client.cache.updateQuery({ query: ALL_BOOKS }, 
        ({ allBooks }) => {        
          return {          
            allPersons: allBooks.concat(addedBook),        
          }      
        })
    }
  })

  useEffect(() => {
    const loggedTokenString = window.localStorage.getItem("loggedLibraryToken");
    if (loggedTokenString) {
      setToken(loggedTokenString);
    }
    // console.log(error)
  }, []);

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()
    navigate("/login");
  }


  if (!token) {
    return (
      <div>
        <h1>Library</h1>
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
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>      
      </div>
    )
  }

  return (
    <div>
      <h1>Library</h1>
      <div>
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
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addbook" element={<AddBook setError={setError} />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </div>
  )
}

export default App

/*
<Notify errorMessage={errorMessage} />

setError={notify}
*/