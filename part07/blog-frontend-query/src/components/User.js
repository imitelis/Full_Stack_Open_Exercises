import PropTypes from "prop-types";
import {
    Link
  } from "react-router-dom";

const User = ({ user, userInfo }) => {

  if (!user || user === null) {
    return (
      <div>
        <h2>User</h2>
        <em>please log in first...</em>
      </div>
    );
  };

  if (!userInfo) {
     return (
       <div>
         <h2>User</h2>
         <em>no user...</em>
       </div>
     )
  }
   
  return (
    <div>
      <h2>User</h2>
      <h3>{userInfo.username} blogs:</h3>
      <ul>
      {userInfo.blogs.length === 0 ? (
      <em>no blogs yet...</em>
      ) : (
      <ul>
        {userInfo.blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
        ))}
      </ul>
      )}
      </ul>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  userInfo: PropTypes.object
};

export default User;