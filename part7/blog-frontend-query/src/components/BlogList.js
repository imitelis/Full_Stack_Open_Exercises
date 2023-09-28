import PropTypes from "prop-types";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const BlogList = ({ blogs, user, newBlogMutation }) => {
  const blogFormRef = useRef();

  if (!user || user === null || !blogs || blogs === null) {
    return (
      <div>
        <h2>Blog list</h2>
        <em>please log in...</em>
      </div>
    );
  }

  return (
    <div className="blog-list">
      {user && (
        <div>
          <Togglable
            className="props-button"
            buttonLabel="new blog"
            ref={blogFormRef}
          >
            <BlogForm
              user={user}
              newBlogMutation={newBlogMutation}
              innerRef={blogFormRef}
            />
          </Togglable>
        </div>
      )}
      <h2>Blog list</h2>
      {blogs.length === 0 ? (
        <div>
          <em>no blogs yet...</em>
        </div>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>
                <h3>title:</h3>
              </th>
              <th>
                <h3>author:</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

BlogList.propTypes = {
  // user: PropTypes.object,
  blogs: PropTypes.array,
  newBlogMutation: PropTypes.object,
};

export default BlogList;
