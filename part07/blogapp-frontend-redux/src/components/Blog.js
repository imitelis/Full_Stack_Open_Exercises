import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";
import { destroyBlog, likeBlog } from "../reducers/blogsReducer";

const Blog = ({ blogInfo, user }) => {

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

  const removeABlog = (returnedBlog) => {
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
    } catch (exception) {
      dispatch(
        setRedNotification(
          `fatal error: something wrong happened (${exception})`
        )
      );
    }
  };

  const likeABlog = (returnedBlog) => {
    try {
      const blogId = returnedBlog.id;
      const likedBlog = { ...returnedBlog, likes: returnedBlog.likes + 1 };

      dispatch(likeBlog(blogId, likedBlog)).catch((error) => {
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

  const updatelikesBlog = (event) => {
    event.preventDefault();
    likeABlog({ ...blogInfo });
  };

  const deleteBlog = (event) => {
    event.preventDefault();
    removeABlog({ ...blogInfo });
  };

  if (!blogInfo) {
    return (
      <div>
        <h2>Blog</h2>
        <em>no blog...</em>
      </div>
    )
  }

  return (
    <div>
      <h2>Blog</h2>
      <h3>{blogInfo.title} by {blogInfo.author}</h3>
      <div>
        url: <a href={blogInfo.url}>{blogInfo.url}</a> <br />
        likes: {blogInfo.likes} <button onClick={updatelikesBlog}>like</button>{" "} <br />
        added by {blogInfo.user.username} <br />
        {user.username === blogInfo.user.username && (
          <button onClick={deleteBlog}>delete</button>
        )}
      </div>
      <h4>Comments:</h4>
    </div>
  );
};

Blog.propTypes = {
  blogInfo: PropTypes.object,
  user: PropTypes.object
};

export default Blog;
