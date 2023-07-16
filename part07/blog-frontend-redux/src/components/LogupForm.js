import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";

import { setBlogsToken } from "../reducers/blogsReducer";
import { setUser } from "../reducers/userReducer";
import { newUser } from "../reducers/usersReducer";

const LogupForm = ({ user }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleErrorResponse = (error, username) => {
    if (error?.response?.status === 500) {
      dispatch(setRedNotification("fatal error: lost connection to blog"));
    } else if (error?.response?.status === 400) {
      dispatch(
        setRedNotification(
          `user log up failed: username (${username}) already exists`
        )
      );
    } else if (error?.response?.data.error) {
      dispatch(
        setRedNotification(
          `fatal error: something wrong happened (${error?.response?.data.error})`
        )
      );
    }
  };

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
        // console.log(error);
      }
    };
    fetchData(dispatch);
  }, [dispatch]);

  const handleLogup = async (event) => {
    event.preventDefault();
    try {
      if (!name || !username || !password) {
        dispatch(
          setRedNotification(
            `error: username (${username}), name (${name}) and password (*) are required`
          )
        );
      } else if (password !== repeatedPassword) {
        dispatch(
          setRedNotification(
            `error: password (*) and repeated password (*) are not equal`
          )
        );
        setPassword("");
        setRepeatedPassword("");
      } else if (username.length < 3) {
        dispatch(
          setRedNotification(
            `error: username (${username}) minlength must be of three characters`
          )
        );
        setUsername("");
      } else {
        const userObject = {
          name: name,
          username: username,
          password: password,
        };
        await dispatch(newUser(userObject));
        dispatch(
          setGreenNotification(
            `successfully logged up ${username}! now you can log in`
          )
        );
        navigate("/login");
        setName("");
        setUsername("");
        setPassword("");
        setRepeatedPassword("");
      }
    } catch (error) {
      handleErrorResponse(error, username);
      // console.log(error.response.data);
    }
  };

  if (!user || user === null) {
    return (
      <div className="logup-form">
        <form onSubmit={handleLogup}>
          <h2>Log up a new User</h2>
          name:{" "}
          <input
            type="text"
            value={name}
            id="name"
            onChange={({ target }) => setName(target.value)}
          />
          <br />
          username:{" "}
          <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          password:{" "}
          <input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          repeat password:{" "}
          <input
            type="password"
            value={repeatedPassword}
            id="repeat-password"
            onChange={({ target }) => setRepeatedPassword(target.value)}
          />
          <br />
          <button type="submit" id="logup-button">
            log up
          </button>
        </form>
      </div>
    );
  } else if (user.name) {
    return (
      <div className="logupform">
        <h2>Log up</h2>
        <em>{user.name} already logged up...</em>
      </div>
    );
  }
};

LogupForm.propTypes = {
  user: PropTypes.object,
};

export default LogupForm;
