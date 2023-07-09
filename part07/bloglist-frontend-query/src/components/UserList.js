import PropTypes from "prop-types";
import {
    Link
  } from "react-router-dom";

const UserList = ({ user, users }) => {

    if (!user || user === null) {
      return (
        <div>
          <h2>User list</h2>
          <em>please log in...</em>
        </div>
      );
    };
  
    return (
      <div>
        <h2>User list</h2>
        <table>
          <thead><td>{<h3>User</h3>}</td> <td>{<h3>Blogs created</h3>}</td></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>
                   {user.name} as {user.username}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
};

UserList.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array
};

export default UserList;