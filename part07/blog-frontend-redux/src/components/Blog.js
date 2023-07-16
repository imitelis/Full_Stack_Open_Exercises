import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";
import { destroyBlog, renewBlog } from "../reducers/blogsReducer";

const Blog = ({ user, blogInfo }) => {
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();

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

  const deleteABlog = (returnedBlog) => {
    try {
      if (
        window.confirm(
          `remove blog '${returnedBlog.title}' by '${returnedBlog.author}'?`
        )
      ) {
        dispatch(destroyBlog(returnedBlog.id))
          .then(() => {
            dispatch(
              setGreenNotification(
                `blog '${returnedBlog.title}' by '${returnedBlog.author}' was removed`
              )
            );
          })
          .catch((error) => {
            handleErrorResponse(error, user);
          });
      }
    } catch (error) {
      dispatch(
        setRedNotification(`fatal error: something wrong happened (${error})`)
      );
    }
  };

  const likeABlog = (returnedBlog) => {
    try {
      const blogId = returnedBlog.id;
      const likedBlog = { ...returnedBlog, likes: returnedBlog.likes + 1 };

      dispatch(renewBlog(blogId, likedBlog)).catch((error) => {
        handleErrorResponse(error, user);
      });
    } catch (exception) {
      dispatch(
        setRedNotification(
          `fatal error: something wrong happened (${exception})`
        )
      );
    }
  };

  const commentABlog = (returnedBlog, aNewComment) => {
    try {
      const blogId = returnedBlog.id;
      const updatedComments = [...returnedBlog.comments, aNewComment];
      returnedBlog.comments = updatedComments;
      const commentedBlog = { ...returnedBlog, comments: updatedComments };
      setNewComment("");

      dispatch(renewBlog(blogId, commentedBlog)).catch((error) => {
        handleErrorResponse(error, user);
      });
    } catch (exception) {
      dispatch(
        setRedNotification(
          `fatal error: something wrong happened (${exception})`
        )
      );
    }
  };

  const uncommentABlog = (returnedBlog, commentId) => {
    try {
      if (window.confirm(`remove this comment?`)) {
        const blogId = returnedBlog.id;
        const updatedComments = returnedBlog.comments.filter(
          (comment, index) => index !== commentId
        );
        returnedBlog.comments = updatedComments;
        const uncommentedBlog = { ...returnedBlog, comments: updatedComments };

        dispatch(renewBlog(blogId, uncommentedBlog)).catch((error) => {
          handleErrorResponse(error, user);
        });
      }
    } catch (exception) {
      dispatch(
        setRedNotification(
          `fatal error: something wrong happened (${exception})`
        )
      );
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
        likes: {blogInfo.likes} <button onClick={likeBlog}>like</button>{" "}
        <br />
        added by {blogInfo.user.username} <br />
        {user.username === blogInfo.user.username && (
          <button onClick={deleteBlog}>delete</button>
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
                <button onClick={() => deleteCommentBlog(blogInfo, id)}>
                  delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <h4>Add a new comment:</h4>
      <form onSubmit={addCommentBlog}>
        <input type="text" value={newComment} onChange={handleInputChange} />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

Blog.propTypes = {
  blogInfo: PropTypes.object,
  user: PropTypes.object,
};

export default Blog;
