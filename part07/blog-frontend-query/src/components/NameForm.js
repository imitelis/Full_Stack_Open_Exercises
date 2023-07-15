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

const NameForm = ({ user, users, innerRef }) => {
    const [newName, setNewName] = useState("");
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
          setRedNotification(`error: wrong credentials or session expired, ${user.username} please log and try again`)
        );
      } else if (error?.response?.data.error) {
        dispatch(
          setRedNotification(`fatal error: something wrong happened (${error?.response?.data.error})`)
        );
      }
    };
  
    const handleName = (event) => {
      event.preventDefault();
      changeName({
        newName: newName,
        password: password
      });
    };
  
    const changeName = async (returnedForm) => {
      try {
        if (!returnedForm.password || !returnedForm.newName) {
          dispatch(
            setRedNotification(`error: password (*) and new name (${returnedForm.newName}) are required`)
          );
        } else if (user.username === returnedForm.newName) {
            dispatch(
              setRedNotification(`error: name (${user.name}) and new name (${returnedForm.newName}) are equal`)
            );
        } else {
          const currentUser = store.getState().user;

          if (currentUser.username === user.username) {
            
            const updatedUser = {
              username: user.username,
              name: newName,
              password: password
            };
  
            try {
              const userId = getUserIdByUsername(users, user.username);
              await dispatch(beginSession(user.username, returnedForm.password));
              await dispatch(renewUser(userId, updatedUser));
              dispatch(setBlogsToken(currentUser.token));
              dispatch(
                setGreenNotification(`${user.username} name successfully updated`)
              );
              setPassword("");
              setNewName("");
              innerRef.current.toggleVisibility();
            } catch (error) {
              handleErrorResponse(error, user);
            }
          } else {
            dispatch(setRedNotification(`error: wrong credentials or session expired, ${user.username} please log and try again`));
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
        <h2>Change name</h2>
        <form onSubmit={handleName}>
          new name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            id="new-name"
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

NameForm.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    innerRef: PropTypes.object.isRequired,
};
  
export default NameForm;