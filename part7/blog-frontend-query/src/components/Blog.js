import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";

import { urlConverter } from "../utils/url";
import { useNotificationDispatchValue } from "../NotificationContext";

const Blog = ({ user, blogInfo, removeBlogMutation, updateBlogMutation }) => {
  const [newComment, setNewComment] = useState("");

  const notificationDispatch = useNotificationDispatchValue();

  const navigate = useNavigate();

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

  const deleteABlog = (returnedBlog) => {
    try {
      if (
        window.confirm(
          `remove blog '${returnedBlog.title}' by '${returnedBlog.author}'?`
        )
      ) {
        removeBlogMutation.mutate(returnedBlog, {
          onSuccess: () => {
            notificationDispatch({
              type: "GREEN_NOTIFICATION",
              payload: `blog '${returnedBlog.title}' by '${returnedBlog.author}' was removed`,
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
        payload: `fatal error: something wrong happened (${exception})`,
      });
    }
  };

  const likeABlog = (returnedBlog) => {
    try {
      const likedBlog = { ...returnedBlog, likes: returnedBlog.likes + 1 };
      updateBlogMutation.mutate(likedBlog, {
        onError: (error) => {
          handleErrorResponse(error, user);
        },
      });
    } catch (exception) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${exception})`,
      });
    }
  };

  const commentABlog = (returnedBlog, aNewComment) => {
    try {
      const updatedComments = [...returnedBlog.comments, aNewComment];
      returnedBlog.comments = updatedComments;
      const commentedBlog = { ...returnedBlog, comments: updatedComments };
      setNewComment("");

      updateBlogMutation.mutate(commentedBlog, {
        onError: (error) => {
          handleErrorResponse(error, user);
        },
      });
    } catch (exception) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${exception})`,
      });
    }
  };

  const uncommentABlog = (returnedBlog, commentId) => {
    try {
      if (window.confirm(`remove this comment?`)) {
        const updatedComments = returnedBlog.comments.filter(
          (comment, index) => index !== commentId
        );
        returnedBlog.comments = updatedComments;
        const uncommentedBlog = { ...returnedBlog, comments: updatedComments };

        updateBlogMutation.mutate(uncommentedBlog, {
          onError: (error) => {
            handleErrorResponse(error, user);
          },
        });
      }
    } catch (exception) {
      notificationDispatch({
        type: "RED_NOTIFICATION",
        payload: `fatal error: something wrong happened (${exception})`,
      });
    }
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();
    deleteABlog({ ...blogInfo });
  };

  const handleLikeBlog = (event) => {
    event.preventDefault();
    likeABlog({ ...blogInfo });
  };

  const handleCommentBlog = (event) => {
    event.preventDefault();
    commentABlog({ ...blogInfo }, newComment);
  };

  const handleUncommentBlog = (blogInfo, id) => {
    uncommentABlog({ ...blogInfo }, id);
  };

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  if (!user || user === null) {
    return (
      <div className="blog-view">
        <h2>Blog</h2>
        <Card>
          <Card.Body>
            <em>please log in first...</em>
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (!blogInfo) {
    return (
      <div className="blog-view">
        <h2>Blog</h2>
        <Card>
          <Card.Body>
            <em>no blog...</em>
            <br />
            <Button
              className="back-button"
              variant="primary"
              onClick={() => {
                navigate("/blogs");
              }}
            >
              back to blogs
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="blog-view">
      <h2>Blog</h2>
      <Card>
        <Card.Body>
          <Card.Title>
            {blogInfo.title} by {blogInfo.author}
          </Card.Title>
          <Card.Text>
            <iframe src={`${urlConverter(blogInfo.url)}`} title={blogInfo.title} height="300" width="400" ></iframe>
            <br />
            <strong>URL:</strong> <a href={blogInfo.url}>{blogInfo.url}</a>{" "}
            <br />
            <strong>Likes:</strong> {blogInfo.likes}{" "}
            <Button variant="primary" onClick={handleLikeBlog}>
              Like
            </Button>
            <br />
            Added by{" "}
            <Link to={`/users/${blogInfo.user.id}`}>
              {blogInfo.user.username}
            </Link>{" "}
            <br />
            {user.username === blogInfo.user.username && (
              <Button
                className="delete-button"
                variant="danger"
                onClick={handleDeleteBlog}
              >
                Delete
              </Button>
            )}
          </Card.Text>
          <Card.Title>Comments:</Card.Title>
          {blogInfo.comments.length === 0 ? (
            <div>
              <em>no comments yet...</em>
            </div>
          ) : (
            <ul>
              {blogInfo.comments.map((comment, id) => (
                <li key={id}>
                  {comment}{" "}
                  {user.username === blogInfo.user.username && (
                    <Button
                      className="delete-button"
                      variant="danger"
                      onClick={() => handleUncommentBlog(blogInfo, id)}
                    >
                      delete
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
          <Card.Title>Add a new comment:</Card.Title>
          <Form className="comment-form d-flex" onSubmit={handleCommentBlog}>
            <Form.Control
              className="mr-2"
              type="text"
              name="comment"
              id="comment"
              required
              value={newComment}
              onChange={handleInputChange}
            />{" "}
            <Button className="ml-2 add-button" variant="primary" type="submit">
              add
            </Button>
          </Form>
          <Button
            className="back-button"
            variant="primary"
            onClick={() => {
              navigate("/blogs");
            }}
          >
            back to blogs
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

Blog.propTypes = {
  // user: PropTypes.object,
  blogInfo: PropTypes.object,
  removeBlogMutation: PropTypes.object,
  updateBlogMutation: PropTypes.object,
};

export default Blog;
