import PropTypes from "prop-types";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useNotificationDispatchValue } from "../NotificationContext";

const BlogForm = ({ user, newBlogMutation, innerRef }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const notificationDispatch = useNotificationDispatchValue();

  const handleBlog = (event) => {
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
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: "fatal error: lost connection to blog",
      });
    } else if (error?.response?.status === 401) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `session expired: ${user.name} please log and try again`,
      });
    } else {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${error?.response?.data.error})`,
      });
    }
  };

  const createABlog = (returnedBlog) => {
    try {
      if (!returnedBlog.title && !returnedBlog.url) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: title (${returnedBlog.title}) and url (${returnedBlog.url}) are required`,
        });
      } else if (!returnedBlog.title) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: title (${returnedBlog.title}) is required`,
        });
      } else if (!returnedBlog.url) {
        notificationDispatch({
          type: "RED_NOTIFICATION",
          payload: `error: url (${returnedBlog.url}) is required`,
        });
      } else {
        innerRef.current.toggleVisibility();
        newBlogMutation.mutate(returnedBlog, {
          onSuccess: () => {
            notificationDispatch({
              type: "GREEN_NOTIFICATION",
              payload: `new blog '${returnedBlog.title}' by '${returnedBlog.author}' was added`,
            });
          },
          onError: (error) => {
            handleErrorResponse(error, user);
          },
        });
      }
    } catch (exception) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `error: something wrong happened ${exception}`,
      });
    }
  };

  return (
    <div className="blog-form">
      <h2>Create a new Blog</h2>
      <Form onSubmit={handleBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            id="blog-title"
            placeholder="Blog title..."
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            required
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            id="blog-author"
            placeholder="Blog author..."
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            required
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            id="blog-url"
            placeholder="Blog url..."
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" className="create-button">
          create
        </Button>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  // user: PropTypes.object,
  newBlogMutation: PropTypes.object,
  innerRef: PropTypes.object,
};

export default BlogForm;
