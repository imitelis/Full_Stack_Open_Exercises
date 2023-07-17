import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "react-query";
import { Form, Button } from "react-bootstrap";

import { useUserDispatchValue } from "../UserContext";
import { useNotificationDispatchValue } from "../NotificationContext";

import { setToken } from "../requests/blogs";

import loginService from "../services/login";

const UsernameForm = ({ user, users, updateUserMutation, innerRef }) => {
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  const setTokenMutation = useMutation(setToken);

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  function getUserIdByUsername(users, username) {
    const userFound = users.find((user) => user.username === username);
    return userFound ? userFound.id : null;
  }

  const handleErrorResponse = (error, user) => {
    if (error?.response?.status === 500) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: "fatal error: lost connection to blog",
      });
    } else if (error?.response?.status === 401) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `error: wrong credentials or session expired, ${user.name} please log and try again`,
      });
    } else if (error?.response?.status === 400) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `username update failed: username (${newUsername}) already exists`,
      });
    } else if (error?.response?.data.error) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
      });
    }
  };

  const handleUsername = (event) => {
    event.preventDefault();
    changeUsername({
      newUsername: newUsername,
      password: password,
    });
  };

  const changeUsername = async (returnedForm) => {
    try {
      if (!returnedForm.password || !returnedForm.newUsername) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: password (*) and new username (${returnedForm.newUsername}) are required`,
        });
      } else if (user.username === returnedForm.newName) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: username (${user.username}) and new username (${returnedForm.newUsername}) are equal`,
        });
      } else {
        const currentUser = user;

        if (currentUser.name === user.name) {
          const userId = getUserIdByUsername(users, user.username);
          const updatedUser = {
            username: newUsername,
            name: user.name,
            password: password,
            id: userId,
          };

          try {
            await loginService
              .login({
                username: user.username,
                password: returnedForm.password,
              })
              .then((user) => {
                userDispatch({ type: "BEGIN_SESSION", payload: user });
                try {
                  updateUserMutation.mutate(updatedUser, {
                    onSuccess: () => {
                      notificationDispatch({
                        type: "GREEN_NOTIFICATION",
                        payload: `${user.name} username successfully updated`,
                      });
                    },
                    onError: (error) => {
                      handleErrorResponse(error, user);
                    },
                  });
                } catch (error) {
                  handleErrorResponse(error, user);
                }
              })
              .catch((error) => {
                handleErrorResponse(error, user);
              });

            setTokenMutation.mutate(currentUser.token);
            setPassword("");
            setNewUsername("");
            innerRef.current.toggleVisibility();
          } catch (error) {
            handleErrorResponse(error, user);
          }
        } else {
          notificationDispatch({
            type: "RED_NOTIFICATION",
            payload: `error: wrong credentials or session expired, ${user.name} please log and try again`,
          });
          setPassword("");
          setNewUsername("");
          innerRef.current.toggleVisibility();
        }
      }
    } catch (error) {
      handleErrorResponse(error, user);
      setPassword("");
      setNewUsername("");
    }
  };

  return (
    <div className="username-form">
      <h3>Change username</h3>
      <Form onSubmit={handleUsername}>
        <Form.Group>
          <Form.Label>new username:</Form.Label>
          <Form.Control
            type="text"
            name="new-name"
            id="new-username"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
            required
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" className="change-button">
          change
        </Button>
      </Form>
    </div>
  );
};

UsernameForm.propTypes = {
  // user: PropTypes.object,
  users: PropTypes.array,
  updateUserMutation: PropTypes.object,
  innerRef: PropTypes.object,
};

export default UsernameForm;
