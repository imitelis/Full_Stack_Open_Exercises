import { useRef } from "react";
import PropTypes from "prop-types";

import Togglable from "./Togglable";
import PasswordForm from "./PasswordForm";
import DeleteForm from "./DeleteForm";

/*
import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";
*/

const Account = ({ user, users }) => {

    const passwordFormRef = useRef();

    if (!user || user === null) {
        return (
          <div>
            <h2>Account</h2>
            <em>please log in...</em>
          </div>
        );
    };

    return (
      <div>
        <h2>Account</h2>
        <h3>
          Name: {user.name} <br/>
          Username: {user.username}
        </h3>
        {user && (
        <Togglable buttonLabel="change password" ref={passwordFormRef}>
          <PasswordForm user={user} users={users} innerRef={passwordFormRef} />
        </Togglable>
        )}
        {user && (
        <Togglable buttonLabel="delete user" ref={passwordFormRef}>
          <DeleteForm user={user} users={users} innerRef={passwordFormRef} />
        </Togglable>
        )}        
      </div>
    );
};

Account.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array
};
  
export default Account;