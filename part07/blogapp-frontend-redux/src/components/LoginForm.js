import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";

import { setBlogsToken } from "../reducers/blogsReducer";
import { setUser, beginSession } from "../reducers/userReducer";

import store from "../store";

const LoginForm = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (dispatch) => {
      try {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
        const sessionUser = JSON.parse(loggedUserJSON).payload;
        if (sessionUser) {
          dispatch(setUser(sessionUser));
          dispatch(setBlogsToken(sessionUser.token));
          // console.log("here localStorage", sessionUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(dispatch);
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (!username || !password) {
        dispatch(
          setRedNotification(
            `error: username (${username}) and password (*) are required`
          )
        );
      } else {
        await dispatch(beginSession(username, password));
        const currentUser = store.getState().user;
        // console.log("here currentUser", currentUser);
        if (currentUser) {
          dispatch(setGreenNotification(`welcome ${currentUser.name}!`));
          dispatch(setBlogsToken(currentUser.token));
          setUsername("");
          setPassword("");
        }
        if (!currentUser) {
          dispatch(
            setRedNotification(`wrong credentials or non-existing user`)
          );
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  if (!user || user === null) {
  return (
    <div className="loginform">
    <form onSubmit={handleLogin}>
      <h2>Login an existing User</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
    </div>
  );
  } else if (user.name) {
    return (
      <div className="loginform">
        <em>{user.name} already logged in...</em>
      </div>
    )
  }
};

LoginForm.propTypes = {
  user: PropTypes.object,
};

export default LoginForm;
