// import { useState } from "react";

import { useNotificationDispatchValue } from '../NotificationContext'

import Blog from "./Blog";

const BlogList = ({ blogs, user, removeBlogMutation, updateBlogMutation }) => {

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
                setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
              },
              onError: (error) => {
                handleErrorResponse(error, user);
              }
            })
          }
        } catch (exception) {
          notificationDispatch({ type: "RED_NOTIFICATION", payload: `fatal error: something wrong happened (${exception})`})
          setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
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
          setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
        }
      };

    return (
        <div>
          <h2>Blog list</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                removeBlog={deleteABlog}
                likeBlog={likeABlog}
              />
            ))}
        </div>
    )
};

export default BlogList;