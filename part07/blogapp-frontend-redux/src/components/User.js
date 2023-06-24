import PropTypes from "prop-types";
import {
    Link
  } from "react-router-dom";

const User = ({ userInfo }) => {

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
         {userInfo.blogs.map((blog) => (
           <li key={blog.id}>
           <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
           </li>
         ))}
         </ul>
       </div>
     )
}

User.propTypes = {
    userInfo: PropTypes.object
};
  
export default User;