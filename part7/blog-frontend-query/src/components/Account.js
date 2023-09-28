import PropTypes from "prop-types";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import Togglable from "./Togglable";
import NameForm from "./NameForm";
import UsernameForm from "./UsernameForm";
import PasswordForm from "./PasswordForm";
import DeleteForm from "./DeleteForm";

const Account = ({ user, users, removeUserMutation, updateUserMutation }) => {
  const nameFormRef = useRef();
  const usernameFormRef = useRef();
  const passwordFormRef = useRef();
  const deleteFormRef = useRef();

  const navigate = useNavigate();

  if (!user || user === null) {
    return (
      <div>
        <h2>Account</h2>
        <em>please log in...</em>
      </div>
    );
  }

  function getUserIdByUsername(users, username) {
    const userFound = users.find((user) => user.username === username);
    return userFound ? userFound.id : null;
  }

  const userId = getUserIdByUsername(users, user.username);

  return (
    <div>
      <h2>Account</h2>
      <h3>Blogs:</h3>
      <Button
        className="back-button"
        variant="primary"
        onClick={() => {
          navigate(`/users/${userId}`);
        }}
      >
        {user.username}'s blogs
      </Button>
      <h3>Name: {user.name}</h3>
      {user && (
        <Togglable buttonLabel="change name" ref={nameFormRef}>
          <NameForm
            user={user}
            users={users}
            updateUserMutation={updateUserMutation}
            innerRef={nameFormRef}
          />
        </Togglable>
      )}
      <h3>Username: {user.username}</h3>
      {user && (
        <Togglable buttonLabel="change username" ref={nameFormRef}>
          <UsernameForm
            user={user}
            users={users}
            updateUserMutation={updateUserMutation}
            innerRef={usernameFormRef}
          />
        </Togglable>
      )}
      <h3>Danger zone</h3>
      {user && (
        <Togglable buttonLabel="change password" ref={passwordFormRef}>
          <PasswordForm
            user={user}
            users={users}
            updateUserMutation={updateUserMutation}
            innerRef={passwordFormRef}
          />
        </Togglable>
      )}
      <br />
      {user && (
        <Togglable buttonLabel="delete user" ref={deleteFormRef}>
          <DeleteForm
            user={user}
            users={users}
            removeUserMutation={removeUserMutation}
            innerRef={deleteFormRef}
          />
        </Togglable>
      )}
    </div>
  );
};

Account.propTypes = {
  // user: PropTypes.object,
  users: PropTypes.array,
  removeUserMutation: PropTypes.object,
  updateUserMutation: PropTypes.object,
};

export default Account;
