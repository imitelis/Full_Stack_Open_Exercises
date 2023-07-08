import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";

import { destroyUser } from "../reducers/usersReducer";
import { beginSession } from "../reducers/userReducer";

import store from "../store";

const DeleteForm = ({ user, users, innerRef }) => {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const dispatch = useDispatch();

  function getUserIdByUsername(users, username) {
    const userFound = users.find((user) => user.username === username)
    return userFound ? userFound.id : null;
  }

  const handleErrorResponse = (error, user) => {
    if (error?.response?.status === 500) {
      dispatch(setRedNotification("fatal error: lost connection to blog"));
    } else if (error?.response?.status === 401) {
      dispatch(
        setRedNotification(`error: wrong credentials or session expired: ${user.name} please log and try again`)
      );
    } else if (error?.response?.data.error) {
      dispatch(
        setRedNotification(`fatal error: something wrong happened (${error?.response?.data.error})`)
      );
    }
  };

  const deletingForm = (event) => {
    event.preventDefault();
    deleteUser({
      password: password,
      repeatedPassword: repeatedPassword
    });

    setPassword("");
    setRepeatedPassword("");
  };

  const deleteUser = async (returnedForm) => {
    try {
      if (returnedForm.password !== returnedForm.repeatedPassword) {
        dispatch(
          setRedNotification(`error: password (*) and repeated password (*) are not equal`)
        );
      } else {
        const currentUser = store.getState().user;
        if (currentUser.username === user.username) {

          try {
            dispatch(beginSession(user.username, returnedForm.password))
            .then(() => {
              try {
                const userId = getUserIdByUsername(users, user.username)
                dispatch(destroyUser(userId))
                .then(() => {
                  dispatch(
                    setGreenNotification(`${user.username} successfully deleted`)
                  );
                })
                .catch((error) => {
                  handleErrorResponse(error, user);
                });
              } catch(error) {
                handleErrorResponse(error, user);
              }
            })
          } catch (error) {
            handleErrorResponse(error, user);
          }
        }
      }
    } catch (error) {
      handleErrorResponse(error, user);
    }
  };

  return (
    <div className="blogform">
      <h2>Delete user</h2>
      <form onSubmit={deletingForm}>
        password:{" "}
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password..."
          id="password"
          type="password"
          required
        />{" "}
        <br />
        repeat password:{" "}
        <input
          value={repeatedPassword}
          onChange={(event) => setRepeatedPassword(event.target.value)}
          placeholder="Repeat password..."
          id="repeat-password"
          type="password"
          required
        />{" "}
        <br />
        <button type="submit" id="change-button">
          change
        </button>
      </form>
    </div>
  );
};

DeleteForm.propTypes = {
  user: PropTypes.object.isRequired,
  innerRef: PropTypes.object.isRequired,
};

export default DeleteForm;