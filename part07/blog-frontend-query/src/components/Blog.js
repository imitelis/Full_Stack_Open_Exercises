import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from 'react-bootstrap';

import { useNotificationDispatchValue } from '../NotificationContext';

const Blog = ({ user, blogInfo, removeBlogMutation, updateBlogMutation }) => {
  const [newComment, setNewComment] = useState("");

  const notificationDispatch = useNotificationDispatchValue();

  const handleErrorResponse = (error, user) => {
    if (error?.response?.status === 500) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: "fatal error: lost connection to blog"})
    } else if (error?.response?.status === 401) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `session expired: ${user.name} please log and try again`})
    } else {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${error?.response?.data.error})`})
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
            notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `blog '${returnedBlog.title}' by '${returnedBlog.author}' was removed`})
          },
          onError: (error) => {
            handleErrorResponse(error, user);
          }
        })
      }
    } catch (exception) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${exception})`})
    }
  };

  const likeABlog = (returnedBlog) => {
    try {
      const likedBlog = { ...returnedBlog, likes: returnedBlog.likes + 1 };
      updateBlogMutation.mutate(likedBlog, {
        onError: (error) => {
          handleErrorResponse(error, user);
        }
      })
    } catch (exception) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${exception})`})
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
        }
      })
    } catch (exception) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${exception})`})
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
          }
        })
      }
    } catch (exception) {
      notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${exception})`})
    }
  };

  const deleteBlog = (event) => {
    event.preventDefault();
    deleteABlog({ ...blogInfo });
  };

  const likeBlog = (event) => {
    event.preventDefault();
    likeABlog({ ...blogInfo });
  };

  const addCommentBlog = (event) => {
    event.preventDefault();
    commentABlog({ ...blogInfo }, newComment);
  };

  const deleteCommentBlog = (blogInfo, id) => {
    uncommentABlog({ ...blogInfo }, id);
  };

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  if (!user || user === null) {
    return (
      <div>
        <h2>Blog</h2>
        <em>please log in first...</em>
      </div>
    );
  }

  if (!blogInfo) {
    return (
      <div>
        <h2>Blog</h2>
        <em>no blog...</em>
      </div>
    );
  }

  return (
    <div>
      <h2>Blog</h2>
      <h3>
        {blogInfo.title} by {blogInfo.author}
      </h3>
      <div>
        url: <a href={blogInfo.url}>{blogInfo.url}</a> <br />
        likes: {blogInfo.likes} <Button variant="primary" onClick={likeBlog}>like</Button>
        <br />
        added by {blogInfo.user.username} <br />
        {user.username === blogInfo.user.username && (
          <Button variant="primary" onClick={deleteBlog}>delete</Button>
        )}
      </div>
      <h4>Comments:</h4>
      {blogInfo.comments.length === 0 ? (
        <em>no comments yet...</em>
      ) : (
        <ul>
          {blogInfo.comments.map((comment, id) => (
            <li key={id}>
              {comment}{" "}
              {user.username === blogInfo.user.username && (
                <Button variant="primary" onClick={() => deleteCommentBlog(blogInfo, id)}>delete</Button>
              )}
            </li>
          ))}
        </ul>
      )}
      <h4>Add a new comment:</h4>
      <form onSubmit={addCommentBlog}>
        <input type="text" value={newComment} onChange={handleInputChange} />
        <Button variant="primary" type="submit">add</Button>
      </form>
    </div>
  );
};

Blog.propTypes = {
  // user: PropTypes.object,
  blogInfo: PropTypes.object,
  removeBlogMutation: PropTypes.object,
  updateBlogMutation: PropTypes.object
};

export default Blog;
