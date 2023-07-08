import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";
import { newBlog } from "../reducers/blogsReducer";

const BlogForm = ({ user, innerRef }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    createABlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  const handleErrorResponse = (error, user) => {
    if (error?.response?.status === 500) {
      dispatch(setRedNotification("fatal error: lost connection to blog"));
    } else if (error?.response?.status === 401) {
      dispatch(
        setRedNotification(
          `session expired: ${user.name} please log and try again`
        )
      );
    } else if (error?.response?.data.error) {
      dispatch(
        setRedNotification(
          `fatal error: something wrong happened (${error?.response?.data.error})`
        )
      );
    }
  };

  const createABlog = (returnedBlog) => {
    try {
      if (!returnedBlog.title && !returnedBlog.url) {
        dispatch(
          setRedNotification(
            `error: title (${returnedBlog.title}) and url (${returnedBlog.url}) are required`
          )
        );
      } else if (!returnedBlog.title) {
        dispatch(
          setRedNotification(`error: title (${returnedBlog.title}) is required`)
        );
      } else if (!returnedBlog.url) {
        dispatch(
          setRedNotification(`error: url (${returnedBlog.url}) is required`)
        );
      } else {
        innerRef.current.toggleVisibility();
        dispatch(newBlog(returnedBlog))
          .then(() => {
            dispatch(
              setGreenNotification(
                `new blog '${returnedBlog.title}' by '${returnedBlog.author}' was added`
              )
            );
          })
          .catch((error) => {
            handleErrorResponse(error, user);
          });
      }
    } catch (error) {
      dispatch(
        setRedNotification(`error: something wrong happened ${error}`)
      );
    }
  };

  return (
    <div className="blogform">
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        title:{" "}
        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder="Blog title..."
          id="blog-title"
          required
        />{" "}
        <br />
        author:{" "}
        <input
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          placeholder="Blog author..."
          id="blog-author"
        />{" "}
        <br />
        url:{" "}
        <input
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          placeholder="Blog url..."
          id="blog-url"
          required
        />{" "}
        <br />
        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  user: PropTypes.object.isRequired,
  innerRef: PropTypes.object.isRequired,
};

export default BlogForm;
