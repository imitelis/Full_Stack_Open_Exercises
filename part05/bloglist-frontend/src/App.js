import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import NotificationSuccess from './components/NotificationSuccess'
import NotificationError from './components/NotificationError'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [successShown, setSuccessShown] = useState(false)

  const blogFormRef = useRef()

  const clearMessage = (error = false, success = false) => {
    if (error) {
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    } else if (success) {
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs)
        if (!successShown) {
          setSuccessMessage('successfully connected to blog')
          setSuccessShown(true)
          clearMessage(undefined, true)
        }
      })
  }, [])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
      .catch((error) => {
        handleErrorResponse(error, user)
      })
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleErrorResponse = (error, user) => {
    if (error.response.status === 500) {
      setErrorMessage('fatal error: lost connection to blog')
    } else if (error.response.status === 401) {
      setErrorMessage(`session expired: ${user.name} please log and try again`)
    } else {
      setErrorMessage(`fatal error: something wrong happened (${error.response.data.error})`)
    }
    clearMessage(true, undefined)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      /* console.log('logging in with', username, password) */
      console.log(user.token)
      setSuccessMessage(`welcome ${username}`)
      clearMessage(undefined, true)
    } catch(error) {
      if (!username || !password) {
        setErrorMessage(`error: username (${username}) and password (*) are required`)
      } else if (error.response.status === 500) {
        setErrorMessage('fatal error: lost connection to blog')
      } else if (error.response.status === 401) {
        setErrorMessage(`wrong credentials or non-existing user (${username})`)
      } else {
        setErrorMessage(`fatal error: something wrong happened (${error.response.data.error})`)
      }
      clearMessage(true, undefined)
    }
  }

  const addBlog = (returnedBlog) => {
    try {
      if (!returnedBlog.title && !returnedBlog.url) {
        setErrorMessage(`error: title (${returnedBlog.title}) and url (${returnedBlog.url}) are required`)
        clearMessage(true, undefined)
      } else if (!returnedBlog.title) {
        setErrorMessage(`error: title (${returnedBlog.title}) is required`)
        clearMessage(true, undefined)
      } else if (!returnedBlog.url) {
        setErrorMessage(`error: url (${returnedBlog.url}) is required`)
        clearMessage(true, undefined)
      } else {
        blogFormRef.current.toggleVisibility()
        blogService.createBlog(returnedBlog)
          .then(() => {
            setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
            clearMessage(undefined, true)
          })
          .catch((error) => {
            handleErrorResponse(error, user)
          })
      }

    } catch(exception) {
      setErrorMessage(`error: something wrong happened ${exception}`)
      clearMessage(true, undefined)
    }

  }

  const updatelikesBlog = (returnedBlog) => {
    try {
      const blogId = returnedBlog.id
      const likedBlog = { ...returnedBlog,
        likes: returnedBlog.likes + 1 }

      blogService.updateBlog(blogId, likedBlog)
        .catch((error) => {
          handleErrorResponse(error, user)
        })
    } catch(exception) {
      setErrorMessage(`fatal error: something wrong happened (${exception})`)
      clearMessage(true, undefined)
    }
  }

  const deleteBlog = (returnedBlog) => {
    try {

      if (window.confirm(`Remove blog ${returnedBlog.title} by ${returnedBlog.author}?`)) {
        blogService.deleteBlog(returnedBlog.id)
          .then(() => {
            setErrorMessage(`blog ${returnedBlog.title} by ${returnedBlog.author} was removed`)
            clearMessage(true, undefined)
          })
          .catch((error) => {
            handleErrorResponse(error, user)
          })
      }
    } catch(exception) {
      setErrorMessage(`fatal error: something wrong happened (${exception})`)
      clearMessage(true, undefined)
    }
  }

  return (
    <div>
      <h1>Blog</h1>
      {user === null && (<> {errorMessage && <NotificationError notificationMessage={errorMessage}/>} </>)}
      {user === null &&
      <Togglable buttonLabel="log in blog">
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </Togglable>
      }
      {user &&
      <LogoutForm
        name={user.name}
        setUser={setUser}
      />}
      <br />
      {user && (<> {successMessage && <NotificationSuccess notificationMessage={successMessage} />} {errorMessage && <NotificationError notificationMessage={errorMessage} />} </>)}
      {user &&
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      }
      <br />
      {user &&
      <div>
        <h2>Bloglist</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            removeBlog={deleteBlog}
            likeBlog={updatelikesBlog}
          />)}
      </div>}
    </div>
  )
}

export default App
