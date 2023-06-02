import { useState, useEffect, useRef } from "react";

import { useDispatchValue } from './NotificationContext'

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [successShown, setSuccessShown] = useState(false);

  const blogFormRef = useRef();

  const notificationDispatch = useDispatchValue()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
      if (!successShown) {
        notificationDispatch({ type: "GREEN_NOTIFICATION", payload: "successfully connected to blog"})
        setSuccessShown(true);
      }
    });
  }, []);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        setBlogs(blogs);
      })
      .catch((error) => {
        handleErrorResponse(error, user);
      });
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleErrorResponse = (error, user) => {
    if (error?.response?.status === 500) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: "fatal error: lost connection to blog"})
    } else if (error?.response?.status === 401) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `session expired: ${user.name} please log and try again`})
    } else {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${error?.response?.data.error})`})
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(user.token);
      notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `welcome ${username}`})
    } catch (error) {
      if (!username || !password) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: username (${username}) and password (*) are required`})
      } else if (error.response.status === 500) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: "fatal error: lost connection to blog"})
      } else if (error.response.status === 401) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `wrong credentials or non-existing user (${username})`})
      } else {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${error.response.data.error})`})
      }
    }
  };

  const addBlog = (returnedBlog) => {
    try {
      if (!returnedBlog.title && !returnedBlog.url) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: title (${returnedBlog.title}) and url (${returnedBlog.url}) are required`})
      } else if (!returnedBlog.title) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: title (${returnedBlog.title}) is required`})
      } else if (!returnedBlog.url) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: url (${returnedBlog.url}) is required`})
      } else {
        blogFormRef.current.toggleVisibility();
        blogService
          .createBlog(returnedBlog)
          .then(() => {
            notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `new blog '${returnedBlog.title}' by '${returnedBlog.author}' was added`})
          })
          .catch((error) => {
            handleErrorResponse(error, user);
          });
      }
    } catch (exception) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: something wrong happened ${exception}`})
    }
  };

  const updatelikesBlog = (returnedBlog) => {
    try {
      const blogId = returnedBlog.id;
      const likedBlog = { ...returnedBlog, likes: returnedBlog.likes + 1 };

      blogService.updateBlog(blogId, likedBlog).catch((error) => {
        handleErrorResponse(error, user);
      });
    } catch (exception) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${exception})`})
    }
  };

  const deleteBlog = (returnedBlog) => {
    try {
      if (
        window.confirm(
          `remove blog '${returnedBlog.title}' by '${returnedBlog.author}'?`
        )
      ) {
        blogService
          .deleteBlog(returnedBlog.id)
          .then(() => {
            notificationDispatch({ type: "RED_NOTIFICATION", payload: `blog '${returnedBlog.title}' by '${returnedBlog.author}' was removed`})
          })
          .catch((error) => {
            handleErrorResponse(error, user);
          });
      }
    } catch (exception) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${exception})`})
    }
  };

  return (
    <div>
      <h1>Blog</h1>
      {user === null && <Notification />}
      {user === null && (
        <Togglable buttonLabel="log in blog">
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      )}
      {user && <LogoutForm name={user.name} setUser={setUser} />}
      <br />
      {user && <Notification />}
      {user && (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      )}
      <br />
      {user && (
        <div>
          <h2>Blog list</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                removeBlog={deleteBlog}
                likeBlog={updatelikesBlog}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
