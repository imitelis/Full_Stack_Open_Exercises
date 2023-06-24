import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { useUserValue, useUserDispatchValue } from './UserContext'
import { useNotificationDispatchValue } from './NotificationContext'

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { setToken, getBlogs, createBlog, deleteBlog, updateBlog } from "./requests/blogs"

const App = () => {

  const [successShown, setSuccessShown] = useState(false);

  const blogFormRef = useRef();

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const queryClient = useQueryClient();

  let result = useQuery('blogs', getBlogs);

  const user = useUserValue();
  const blogs = result.data;

  const setTokenMutation = useMutation(setToken);

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  });
  
  const removeBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  });

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  });  

  useEffect(() => {
    if (blogs && !successShown) {
      notificationDispatch({ type: "GREEN_NOTIFICATION", payload: "successfully connected to blog" })
      setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      setSuccessShown(true);
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // console.log("useEffect user", user)
      userDispatch({ type: "PLACE_USER", payload: user })
      setTokenMutation.mutate(user.token);
    }
  }, []);

  if (result.isLoading) {
    return (
      <div>
        <h1>Blog app</h1>
        {user === null && <Notification />}
        <em>loading data...</em>
      </div>
    )
  }

  return (
    <div>
      <h1>Blog app</h1>
      {user === null && <Notification />}
      {user === null && (
        <Togglable buttonLabel="log in blog">
          <LoginForm/>
        </Togglable>
      )}
      {user && <LogoutForm user={user} />}
      <br />
      {user && <Notification user={user} />}
      {user && (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm user={user} innerRef={blogFormRef} newBlogMutation={newBlogMutation} />
        </Togglable>
      )}
      <br />
      {user && <BlogList user={user} blogs={blogs} removeBlogMutation={removeBlogMutation} updateBlogMutation={updateBlogMutation} />}
    </div>
  );
};

export default App;
