import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";

import { setBlogsToken } from "../reducers/blogsReducer";
import { beginSession } from "../reducers/userReducer";
import { renewUser } from "../reducers/usersReducer";

import store from "../store";

const PasswordForm = ({ user, users, innerRef }) => {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRepeatedPassword, setNewRepeatedPassword] = useState("");

  const dispatch = useDispatch();

  function getUserIdByUsername(users, username) {
    const userFound = users.find((user) => user.username === username);
    return userFound ? userFound.id : null;
  }

  const handleErrorResponse = (error, user) => {
    if (error?.response?.status === 500) {
      dispatch(setRedNotification("fatal error: lost connection to blog"));
    } else if (error?.response?.status === 401) {
      dispatch(
        setRedNotification(
          `error: wrong credentials or session expired, ${user.name} please log and try again`
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
        dispatch(
          setRedNotification(
            `error: password (*), repeated password (*) and new password (*) are required`
          )
        );
      } else if (returnedForm.password !== returnedForm.repeatedPassword) {
        dispatch(
          setRedNotification(
            `error: password (*) and repeated password (*) are not equal`
          )
        );
      } else if (
        returnedForm.newPassword !== returnedForm.newRepeatedPassword
      ) {
        dispatch(
          setRedNotification(
            `error: new password (*) and repeated new password (*) are not equal`
          )
        );
      } else if (returnedForm.password === returnedForm.newPassword) {
        dispatch(
          setRedNotification(
            `error: password (*) and new password (*) are equal`
          )
        );
      } else if (returnedForm.newPassword.length < 3) {
        dispatch(
          setRedNotification(
            `error: newpassword (*) minlength must be of three characters`
          )
        );
      } else {
        const currentUser = store.getState().user;

        if (currentUser.username === user.username) {
          const updatedUser = {
            username: user.username,
            name: user.name,
            password: newPassword,
          };

          try {
            const userId = getUserIdByUsername(users, user.username);
            dispatch(renewUser(userId, updatedUser));
            dispatch(beginSession(user.username, returnedForm.password));
            dispatch(setBlogsToken(currentUser.token));
            dispatch(
              setGreenNotification(
                `${user.username} password successfully updated`
              )
            );
            innerRef.current.toggleVisibility();
          } catch (error) {
            handleErrorResponse(error, user);
          }
        } else {
          dispatch(
            setRedNotification(
              `error: wrong credentials or session expired, ${user.name} please log and try again`
            )
          );
        }
      }
    } catch (error) {
      handleErrorResponse(error, user);
    }
  };

  return (
    <div className="password-form">
      <h2>Change password</h2>
      <form onSubmit={handlePassword}>
        password:{" "}
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="password"
          type="password"
          required
        />
        <br />
        repeat password:{" "}
        <input
          value={repeatedPassword}
          onChange={(event) => setRepeatedPassword(event.target.value)}
          id="repeat-password"
          type="password"
          required
        />
        <br />
        new password:{" "}
        <input
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          id="new-password"
          type="password"
          required
        />
        <br />
        repeat new password:{" "}
        <input
          value={newRepeatedPassword}
          onChange={(event) => setNewRepeatedPassword(event.target.value)}
          id="repeat-new-password"
          type="password"
          required
        />
        <br />
        <button type="submit" id="change-button">
          change
        </button>
      </form>
    </div>
  );
};

PasswordForm.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  innerRef: PropTypes.object.isRequired,
};

export default PasswordForm;
