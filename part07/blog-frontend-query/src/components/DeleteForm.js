import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { useUserDispatchValue } from "../UserContext";
import { useNotificationDispatchValue } from "../NotificationContext";

import { setToken } from "../requests/blogs";

import loginService from "../services/login";

const DeleteForm = ({ user, users, removeUserMutation, innerRef }) => {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [markerClicked, setMarkerClicked] = useState(false);

  const setTokenMutation = useMutation(setToken);

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const navigate = useNavigate();

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
    } else if (error?.response?.data.error) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
      });
    }
  };

  const handleMarkerClick = () => {
    setMarkerClicked(!markerClicked);
  };

  const handleDelete = (event) => {
    event.preventDefault();

    if (markerClicked) {
      deleteUser({
        password: password,
        repeatedPassword: repeatedPassword,
      });
    } else if (!markerClicked) {
      innerRef.current.toggleVisibility();
      setPassword("");
      setRepeatedPassword("");
    }
  };

  const deleteUser = async (returnedForm) => {
    const currentUser = user;

    if (currentUser.username === user.username) {
      try {
        const userId = getUserIdByUsername(users, user.username);

        const deletedUser = {
          username: user.username,
          name: user.name,
          password: password,
          id: userId,
        };

        await loginService
          .login({
            username: user.username,
            password: returnedForm.password,
          })
          .then((user) => {
            userDispatch({ type: "BEGIN_SESSION", payload: user });
            try {
              const currentUser = user;

              if (currentUser) {
                removeUserMutation.mutate(deletedUser, {
                  onSuccess: () => {
                    notificationDispatch({
                      type: "GREEN_NOTIFICATION",
                      payload: `${user.username} user successfully deleted`,
                    });
                  },
                  onError: (error) => {
                    handleErrorResponse(error, user);
                  },
                });

                userDispatch({ type: "END_SESSION", payload: null });
                setTokenMutation.mutate(null);
                navigate("/login");
              } else if (!currentUser) {
                notificationDispatch({
                  type: "RED_NOTIFICATION",
                  payload: `error: wrong credentials or non-existing user`,
                });
              }
            } catch (error) {
              handleErrorResponse(error, user);
            }
          })
          .catch((error) => {
            handleErrorResponse(error, user);
          });

        setPassword("");
        setRepeatedPassword("");
      } catch (error) {
        handleErrorResponse(error, user);
      }
    } else {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `error: wrong credentials or session expired, ${user.name} please log and try again`,
      });
    }
  };

  return (
    <div className="delete-form">
      <h3>Delete account</h3>
      <Form onSubmit={handleDelete}>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Form.Label>repeat password:</Form.Label>
          <Form.Control
            type="password"
            name="repeat-password"
            id="repeat-password"
            required
            value={repeatedPassword}
            onChange={(event) => setRepeatedPassword(event.target.value)}
          />
          <Form.Check
            className="d-inline"
            type="checkbox"
            id="delete-account-checkbox"
            onChange={handleMarkerClick}
          />
          <Form.Label className="d-inline">
            <em>
              delete account and all its blogs (I understand that this action
              cannot be undone)
            </em>
          </Form.Label>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" className="delete-button">
          delete
        </Button>
      </Form>
    </div>
  );
};

DeleteForm.propTypes = {
  // user: PropTypes.object,
  users: PropTypes.array,
  removeUserMutation: PropTypes.object,
  innerRef: PropTypes.object,
};

export default DeleteForm;
