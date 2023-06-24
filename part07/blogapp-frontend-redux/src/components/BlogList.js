import { useRef } from "react";
import PropTypes from "prop-types";
import {
  Link
} from "react-router-dom";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const BlogList = ({ user, blogs }) => {

  const blogFormRef = useRef();

  return (
    <div>      
      {user && (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm user={user} innerRef={blogFormRef} />
        </Togglable>
      )}
      <h2>Blog list</h2>
      {blogs.map((blog) => (
        <div className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogList;
