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

const UsernameForm = ({ user, users, innerRef }) => {
    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword] = useState("");
  
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
          setRedNotification(`error: wrong credentials or session expired, ${user.name} please log and try again`)
        );
      } else if (error?.response?.status === 400) {
        dispatch(
          setRedNotification(`username update failed: username (${newUsername}) already exists`)
        );
      } else if (error?.response?.data.error) {
        dispatch(
          setRedNotification(`fatal error: something wrong happened (${error?.response?.data.error})`)
        );
      }
    };
  
    const handleUsername = (event) => {
      event.preventDefault();
      changeUsername({
        newUsername: newUsername,
        password: password
      });
    };
  
    const changeUsername = async (returnedForm) => {
      try {
        if (!returnedForm.password || !returnedForm.newUsername) {
          dispatch(
            setRedNotification(`error: password (*) and new username (${returnedForm.newUsername}) are required`)
          );
        } else if (user.username === returnedForm.newName) {
            dispatch(
              setRedNotification(`error: username (${user.username}) and new username (${returnedForm.newUsername}) are equal`)
            );
        } else {
          const currentUser = store.getState().user;

          if (currentUser.name === user.name) {
            
            const updatedUser = {
              username: newUsername,
              name: user.name,
              password: password
            };
  
            try {
              const userId = getUserIdByUsername(users, user.username);
              await dispatch(beginSession(user.username, returnedForm.password))
              await dispatch(renewUser(userId, updatedUser));
              dispatch(setBlogsToken(currentUser.token));
              dispatch(
                setGreenNotification(`${user.name} username successfully updated`)
              );
              setPassword("");
              setNewUsername("");
              innerRef.current.toggleVisibility();
            } catch (error) {
              handleErrorResponse(error, user);
            }
          } else {
            dispatch(setRedNotification(`error: wrong credentials or session expired, ${user.name} please log and try again`));
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
      <div className="name-form">
        <h2>Change username</h2>
        <form onSubmit={handleUsername}>
          new username:{" "}
          <input
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
            id="new-username"
            required
          />
          <br />
          password:{" "}
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="repeat-password"
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

UsernameForm.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    innerRef: PropTypes.object.isRequired,
};
  
export default UsernameForm;