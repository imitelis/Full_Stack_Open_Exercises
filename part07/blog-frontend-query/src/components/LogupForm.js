import { useState, useEffect } from "react";
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useUserDispatchValue } from '../UserContext'
import { useNotificationDispatchValue } from '../NotificationContext';

import { setToken } from "../requests/blogs";

const LogupForm = ({ user, newUserMutation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const setTokenMutation = useMutation(setToken);

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const navigate = useNavigate();
  
  const handleErrorResponse = (error, username) => {
    if (error?.response?.status === 500) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: "fatal error: lost connection to blog"})
    } else if (error?.response?.status === 400) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `user log up failed: username (${username}) already exists`})
    } else if (error?.response?.data.error) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${error?.response?.data.error})`})
    };
  };

  useEffect(() => {
    const fetchData = async (userDispatch) => {
      try {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
        const sessionUser = JSON.parse(loggedUserJSON).payload;
        if (sessionUser) {
          userDispatch({ type: "BEGIN_SESSION", payload: sessionUser });
          setTokenMutation.mutate(sessionUser.token);
          // console.log("here localStorage", sessionUser);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData(userDispatch);
  }, [userDispatch, setTokenMutation]);

  const handleLogup = async (event) => {
    event.preventDefault();
    try {
      if (!name || !username || !password) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: username (${username}), name (${name}) and password (*) are required`})
      } else if (password !== repeatedPassword) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: password (*) and repeated password (*) are not equal`})
        setPassword("");
        setRepeatedPassword("");
      } else if (username.length < 3) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: username (${username}) minlength must be of three characters`})
        setUsername("");
      } else {
        const userObject = {
          name: name, username: username, password: password
        }
        newUserMutation.mutate(userObject, {
          onSuccess: () => {
            notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `successfully logged up ${username}! now you can log in`})
            navigate('/login');
          },
          onError: (error) => {
            handleErrorResponse(error, username);
          }
        })
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
    return(
      <div className="logup-form">
        <h2>Log up a new User</h2>
        <Form onSubmit={handleLogup}>
        <Form.Group>
          <Form.Label>name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            value={name}            
            onChange={({ target }) => setName(target.value)}
            required
        />
        <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
        />
        <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
        />
        <Form.Label>repeat password:</Form.Label>
          <Form.Control
            type="password"
            name="repeat-password"
            id="repeat-password"
            value={repeatedPassword}            
            onChange={({ target }) => setRepeatedPassword(target.value)}
            required
        />
        </Form.Group>
        <br/>
        <Button variant="primary" type="submit" create-button="logup-button">
          log up
        </Button>
        </Form>
    </div>
    )
  } else if (user.name) {
    return(
      <div className="logup-form">
        <h2>Log up</h2>
        <em>{user.name} already logged up...</em>
      </div>
    )
  }
};

export default LogupForm;
