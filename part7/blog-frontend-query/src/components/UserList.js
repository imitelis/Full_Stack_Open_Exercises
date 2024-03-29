import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const UserList = ({ user, users }) => {
  if (!user || user === null || !users || users === null) {
    return (
      <div>
        <h2>User list</h2>
        <em>please log in...</em>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>User list</h2>
      <Table striped>
        <thead>
          <tr>
            <th>
              <h3>User</h3>
            </th>
            <th>
              <h3>Blogs created</h3>
            </th>
          </tr>
        </thead>
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
      </Table>
    </div>
  );
};

UserList.propTypes = {
  // user: PropTypes.object,
  users: PropTypes.array,
};

export default UserList;
