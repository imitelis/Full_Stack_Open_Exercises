import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'

import { setGreenNotification, setRedNotification } from './reducers/notificationReducer'

import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

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
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      /* console.log('logging in with', username, password) */
      console.log(user.token);
      dispatch(setGreenNotification(`welcome ${username}`));
    } catch (error) {
      if (!username || !password) {
        dispatch(setRedNotification(`error: username (${username}) and password (*) are required`));
      } else if (error.response.status === 500) {
        dispatch(setRedNotification("fatal error: lost connection to blog"));
      } else if (error.response.status === 401) {
        dispatch(setRedNotification(`wrong credentials or non-existing user (${username})`));
      } else {
        dispatch(setRedNotification(`fatal error: something wrong happened (${error.response.data.error})`));
      }
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
          <BlogForm user={user} ref={blogFormRef} />
        </Togglable>
      )}
      <br />
      {user && (<BlogList user={user} />)}
    </div>
  );
};

export default App;
