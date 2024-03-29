import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Table } from "react-bootstrap";

const User = ({ user, userInfo }) => {
  const navigate = useNavigate();

  if (!user || user === null) {
    return (
      <div className="user-view">
        <h2>User</h2>
        <Card>
          <Card.Body>
            <em>please log in first...</em>
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="user-view">
        <h2>User</h2>
        <Card>
          <Card.Body>
            <em>no user...</em>
            <br />
            <Button
              className="back-button"
              variant="primary"
              onClick={() => {
                navigate("/users");
              }}
            >
              back to users
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (userInfo.blogs.length === 0) {
    return (
      <div className="user-view">
        <h2>User</h2>
        <Card>
          <Card.Body>
            <Card.Title>{userInfo.username}'s blogs:</Card.Title>
            <em>no blogs yet...</em>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="user-view">
      <h2>User</h2>
      <Card>
        <Card.Body>
          <Card.Title>{userInfo.username}'s blogs:</Card.Title>
          <Table striped>
            <thead>
              <tr>
                <th>
                  <h3>title:</h3>
                </th>
                <th>
                  <h3>likes:</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {userInfo.blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </td>
                    <td>{blog.likes}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button
            className="back-button"
            variant="primary"
            onClick={() => {
              navigate("/users");
            }}
          >
            back to users
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

User.propTypes = {
  // user: PropTypes.object,
  userInfo: PropTypes.object,
};

export default User;
