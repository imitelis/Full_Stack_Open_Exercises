import { useState } from "react";

const Blog = ({ blog, user, removeBlog, likeBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false);

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
      {blog.title} by {blog.author}{" "}
      <button onClick={() => setBlogVisible(!blogVisible)}>
        {blogVisible ? "hide" : "show"}
      </button>{" "}
      <br />
      {blogVisible ? (
        <div>
          url: {blog.url} <br />
          likes: {blog.likes} <button onClick={updatelikesBlog}>like</button>{" "}
          <br />
          user: {blog.user.username} <br />
          {user.username === blog.user.username && (
            <button onClick={deleteBlog}>delete</button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
