import { useState } from "react";
import { useMutation } from 'react-query'
import PropTypes from "prop-types";

import { useNotificationDispatchValue } from '../NotificationContext'

import { setToken } from "../requests/blogs"

import loginService from "../services/login";

const LoginForm = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notificationDispatch = useNotificationDispatchValue();

  const setTokenMutation = useMutation(setToken)

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      props.setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setTokenMutation.mutate(user.token); 
      // console.log(user.token);
      notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `welcome ${user.name}!`})
      setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
    } catch (error) {
      if (!username || !password) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: username (${username}) and password (*) are required`})
        setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      } else if (error.response.status === 500) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: "fatal error: lost connection to blog"})
        setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      } else if (error.response.status === 401) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `wrong credentials or non-existing user (${username})`})
        setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      } else {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${error.response.data.error})`})
        setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      }
    }
  }

  return (
    <form onSubmit={handleLogin}>
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
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
