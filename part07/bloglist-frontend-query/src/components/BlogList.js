// import { useState } from "react";

import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const BlogList = ({ blogs, user, newBlogMutation }) => {

  const blogFormRef = useRef();

  if (!user || user === null) {
    return (
      <div>
        <h2>Blog list</h2>
        <em>please log in...</em>
      </div>
    );
  }

  return (
    <div>
      {user && (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm user={user} newBlogMutation={newBlogMutation} innerRef={blogFormRef} />
          </Togglable>
        </div>
      )}
      <h2>Blog list</h2>
      {blogs.map((blog) => (
        <div className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;