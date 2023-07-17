import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "react-query";
import { Form, Button } from "react-bootstrap";

import { useUserDispatchValue } from "../UserContext";
import { useNotificationDispatchValue } from "../NotificationContext";

import { setToken } from "../requests/blogs";

import loginService from "../services/login";

const NameForm = ({ user, users, updateUserMutation, innerRef }) => {
  const [newName, setNewName] = useState("");
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
        payload: `error: wrong credentials or session expired, ${user.username} please log and try again`,
      });
    } else if (error?.response?.data.error) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
      });
    }
  };

  const handleName = (event) => {
    event.preventDefault();
    changeName({
      newName: newName,
      password: password,
    });
  };

  const changeName = async (returnedForm) => {
    try {
      if (!returnedForm.password || !returnedForm.newName) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: password (*) and new name (${returnedForm.newName}) are required`,
        });
      } else if (user.username === returnedForm.newName) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: name (${user.name}) and new name (${returnedForm.newName}) are equal`,
        });
      } else {
        const currentUser = user;

        if (currentUser.username === user.username) {
          const userId = getUserIdByUsername(users, user.username);
          const updatedUser = {
            username: user.username,
            name: newName,
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
                        payload: `${user.username} name successfully updated`,
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
            setNewName("");
            innerRef.current.toggleVisibility();
          } catch (error) {
            handleErrorResponse(error, user);
          }
        } else {
          notificationDispatch({
            type: "RED_NOTIFICATION",
            payload: `error: wrong credentials or session expired, ${user.username} please log and try again`,
          });
          setPassword("");
          setNewName("");
          innerRef.current.toggleVisibility();
        }
      }
    } catch (error) {
      handleErrorResponse(error, user);
      setPassword("");
      setNewName("");
    }
  };

  return (
    <div className="name-form">
      <h3>Change name</h3>
      <Form onSubmit={handleName}>
        <Form.Group>
          <Form.Label>new name:</Form.Label>
          <Form.Control
            type="text"
            name="new-name"
            id="new-name"
            required
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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

NameForm.propTypes = {
  // user: PropTypes.object,
  users: PropTypes.array,
  updateUserMutation: PropTypes.object,
  innerRef: PropTypes.object,
};

export default NameForm;
