import PropTypes from "prop-types";
import {
    Link
  } from "react-router-dom";

const UserList = ({ user, users }) => {

    if (!user || user === null) {
      return (
        <div>
          <h2>Users list</h2>
          <em>please log in...</em>
        </div>
      );
    };
  
    return (
      <div>
        <h2>Users list</h2>
        <ol>
        {users.map((user) => (
          <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name} as {user.username}</Link><p> blogs created: {user.blogs.length}</p>
          </li>
        ))}
        </ol>
      </div>
    )
};

UserList.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array
};

export default UserList;