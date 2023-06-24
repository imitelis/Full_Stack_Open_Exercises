import { useState } from "react";
import PropTypes from "prop-types";

import { useNotificationDispatchValue } from '../NotificationContext'

const BlogForm = ({ user, innerRef, newBlogMutation }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const notificationDispatch = useNotificationDispatchValue();

  const handleErrorResponse = (error, user) => {
    if (error?.response?.status === 500) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: "fatal error: lost connection to blog"})
      setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
    } else if (error?.response?.status === 401) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `session expired: ${user.name} please log and try again`})
      setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
    } else {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${error?.response?.data.error})`})
      setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
    }
  }

  const createABlog = (returnedBlog) => {
    try {
      if (!returnedBlog.title && !returnedBlog.url) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: title (${returnedBlog.title}) and url (${returnedBlog.url}) are required`})
        setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      } else if (!returnedBlog.title) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: title (${returnedBlog.title}) is required`})
        setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      } else if (!returnedBlog.url) {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: url (${returnedBlog.url}) is required`})
        setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      } else {
        innerRef.current.toggleVisibility()
        newBlogMutation.mutate(returnedBlog, {
          onSuccess: () => {
            notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `new blog '${returnedBlog.title}' by '${returnedBlog.author}' was added`})
            setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
          },
          onError: (error) => {
            handleErrorResponse(error, user);
          }
        })
      }
    } catch (exception) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `error: something wrong happened ${exception}`})
      setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
    }
  }

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
  newBlogMutation: PropTypes.object.isRequired
};

export default BlogForm;
