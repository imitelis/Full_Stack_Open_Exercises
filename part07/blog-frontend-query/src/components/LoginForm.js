import { useState } from "react";
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useUserDispatchValue } from '../UserContext'
import { useNotificationDispatchValue } from '../NotificationContext'

import { setToken } from "../requests/blogs";

import loginService from "../services/login";

const LoginForm = ({ user }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const setTokenMutation = useMutation(setToken);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      })
      
      await loginService.login({
        username,
        password,
      }).then(user => {
        userDispatch({ type: "BEGIN_SESSION", payload: user });
      }).catch(error => {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${error?.response?.data.error})`})
      });
      
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setTokenMutation.mutate(user.token);
      navigate('/blogs');
      notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `welcome ${user.name}!`})
    } catch (error) {
      if (!username || !password) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: username (${username}) and password (*) are required`})
      } else if (error?.response?.status === 500) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: "fatal error: lost connection to blog"})
      } else if (error?.response?.status === 401) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `wrong credentials or non-existing user (${username})`})
      } else {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${error?.response?.data.error})`})
      }
    }
  }

  if (!user || user === null) {
    return (
      <div className="login-form">
        <h2>Log in an existing User</h2>
        <Form onSubmit={handleLogin}>
        <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
            type="text"
            name="username"
            id="username"
            required
            value={username}
            onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
            type="password"
            name="Password"
            id="password"
            value={password}            
            onChange={({ target }) => setPassword(target.value)}
            required
        />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" className="login-button">
          log in
        </Button>
        </Form>
        </div>  
    )
  } else if (user.name) {
    return (
      <div className="login-form">
        <h2>Log in</h2>
        <em>{user.name} already logged in...</em>
      </div>
    );
  }  
}

export default LoginForm;
