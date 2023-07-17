import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "react-query";
import { Form, Button } from "react-bootstrap";

import { useUserDispatchValue } from "../UserContext";
import { useNotificationDispatchValue } from "../NotificationContext";

import { setToken } from "../requests/blogs";

import loginService from "../services/login";

const PasswordForm = ({ user, users, updateUserMutation, innerRef }) => {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRepeatedPassword, setNewRepeatedPassword] = useState("");

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
    } else if (error?.response?.data.error) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
      });
    }
  };

  const handlePassword = (event) => {
    event.preventDefault();
    changePassword({
      password: password,
      repeatedPassword: repeatedPassword,
      newPassword: newPassword,
      newRepeatedPassword: newRepeatedPassword,
    });

    setPassword("");
    setRepeatedPassword("");
    setNewPassword("");
    setNewRepeatedPassword("");
  };

  const changePassword = async (returnedForm) => {
    try {
      if (
        !returnedForm.password ||
        !returnedForm.repeatedPassword ||
        !returnedForm.newPassword ||
        !returnedForm.newRepeatedPassword
      ) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: password (*), repeated password (*) and new password (*) are required`,
        });
      } else if (returnedForm.password !== returnedForm.repeatedPassword) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: password (*) and repeated password (*) are not equal`,
        });
      } else if (
        returnedForm.newPassword !== returnedForm.newRepeatedPassword
      ) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: new password (*) and repeated new password (*) are not equal`,
        });
      } else if (returnedForm.password === returnedForm.newPassword) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: password (*) and new password (*) are equal`,
        });
      } else if (returnedForm.newPassword.length < 3) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: newpassword (*) minlength must be of three characters`,
        });
      } else {
        const currentUser = user;

        if (currentUser.username === user.username) {
          const userId = getUserIdByUsername(users, user.username);
          const updatedUser = {
            username: user.username,
            name: user.name,
            password: newPassword,
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
                        payload: `${user.username} password successfully updated`,
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
            innerRef.current.toggleVisibility();
          } catch (error) {
            handleErrorResponse(error, user);
          }
        } else {
          notificationDispatch({
            type: "RED_NOTIFICATION",
            payload: `error: wrong credentials or session expired, ${user.name} please log and try again`,
          });
        }
      }
    } catch (error) {
      handleErrorResponse(error, user);
    }
  };

  return (
    <div className="password-form">
      <h3>Change password</h3>
      <Form onSubmit={handlePassword}>
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
          <Form.Label>new password:</Form.Label>
          <Form.Control
            type="password"
            name="new-password"
            id="new-password"
            required
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <Form.Label>new password:</Form.Label>
          <Form.Control
            type="password"
            name="repeatnew-password"
            id="repeatnew-password"
            required
            value={newRepeatedPassword}
            onChange={(event) => setNewRepeatedPassword(event.target.value)}
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

PasswordForm.propTypes = {
  // user: PropTypes.object,
  users: PropTypes.array,
  updateUserMutation: PropTypes.object,
  innerRef: PropTypes.object,
};

export default PasswordForm;
