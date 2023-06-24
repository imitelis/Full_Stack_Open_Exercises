import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

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
  const [loggedup, setLoggedup] = useState(false);

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

  const handleLogup = async (event) => {
    event.preventDefault();
    try {
      if (!name || !username || !password) {
        dispatch(
          setRedNotification(
            `error: username (${username}), name (${name}) and password (*) are required`
          )
        );
      } else if (username.length < 3) {
        dispatch(
          setRedNotification(
            `error: username (${username}) minlength must be of three characters`
          )
        );
      } else {
        const userObject = {
          name: name, username: username, password: password
        }

        const logupUser = await dispatch(newUser(userObject));
        if (logupUser) {
          dispatch(setGreenNotification(`successfully logged up ${logupUser.name}!`));
          // dispatch(setBlogsToken(currentUser.token));
          setName("");
          setUsername("");
          setPassword("");
        } else {
          dispatch(
            setRedNotification(`wrong credentials or existing user`)
          );
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  if (!user || user === null) {
    return(
      <div className="logupform">
        <form onSubmit={handleLogup}>
        <h2>Logup a new User</h2>
        <div>
        name
          <input
            type="text"
            value={name}
            name="Name"
            id="name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
        <button type="submit" id="logup-button">
          logup
        </button>
      </form>
    </div>
    )
  } else if (user.name) {
    return(
      <div className="logupform">
        <em>{user.name} already logged up...</em>
      </div>
    )
  }
};

LogupForm.propTypes = {
  user: PropTypes.object,
};

export default LogupForm;
