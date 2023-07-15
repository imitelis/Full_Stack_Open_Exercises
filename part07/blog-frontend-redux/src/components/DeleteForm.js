import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";

import { setBlogsToken } from "../reducers/blogsReducer";
import { beginSession, endSession } from "../reducers/userReducer";
import { destroyUser } from "../reducers/usersReducer";

import store from "../store";

const DeleteForm = ({ user, users, innerRef }) => {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [markerClicked, setMarkerClicked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const currentUser = store.getState().user;

    if (currentUser.username === user.username) {
      try {
        const userId = getUserIdByUsername(users, user.username);
        await dispatch(beginSession(user.username, returnedForm.password));
        const currentUser = store.getState().user;
        if (currentUser) {
          await dispatch(destroyUser(userId));
          dispatch(
            setGreenNotification(`${user.username} successfully deleted`)
          );
          dispatch(endSession());
          dispatch(setBlogsToken(currentUser.token));
          navigate("/login");
        } else if (!currentUser) {
          dispatch(
            setRedNotification(`error: wrong credentials or non-existing user`)
          );
        }
        setPassword("");
        setRepeatedPassword("");
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
  };

  return (
    <div className="blogform">
      <h2>Delete account</h2>
      <form onSubmit={handleDelete}>
        password:{" "}
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="password"
          type="password"
          required
        />{" "}
        <br />
        repeat password:{" "}
        <input
          value={repeatedPassword}
          onChange={(event) => setRepeatedPassword(event.target.value)}
          id="repeat-password"
          type="password"
          required
        />{" "}
        <br />
        <label>
          <input type="checkbox" onChange={handleMarkerClick} />{" "}
          <em>
            delete account and all its blogs (I understand that this action
            cannot be undone)
          </em>
        </label>
        <br />
        <button type="submit" id="delete-button">
          delete
        </button>
      </form>
    </div>
  );
};

DeleteForm.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  innerRef: PropTypes.object.isRequired,
};

export default DeleteForm;
