import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, removeBlog, likeBlog }) => {

  const updatelikesBlog = (event) => {
    event.preventDefault();
    likeBlog({ ...blog });
  };

  const deleteBlog = (event) => {
    event.preventDefault();
    removeBlog({ ...blog });
  };

  return (
    <div className="blog">
      <a>{blog.title} by {blog.author}</a>
      <br />
      <div>
        url: {blog.url} <br />
        likes: {blog.likes} <button onClick={updatelikesBlog}>like</button>{" "}
        <br />
        user: {blog.user.username} <br />
        {user.username === blog.user.username && (
          <button onClick={deleteBlog}>delete</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
};

export default Blog;
