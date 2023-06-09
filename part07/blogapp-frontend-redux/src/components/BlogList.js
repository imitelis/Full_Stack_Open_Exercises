import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Blog from "./Blog";

import {
  setGreenNotification,
  setRedNotification,
} from "../reducers/notificationReducer";
import { destroyBlog, likeBlog } from "../reducers/blogsReducer";

const BlogList = ({ user, blogs }) => {
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

  return (
    <div>
      <h2>Blog list</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          removeBlog={removeABlog}
          likeBlog={likeABlog}
        />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default BlogList;
