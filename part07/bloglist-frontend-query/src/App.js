import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { useNotificationDispatchValue } from './NotificationContext'

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { setToken, getBlogs } from "./requests/blogs"

const App = () => {

  const [user, setUser] = useState(null);
  const [successShown, setSuccessShown] = useState(false);

  const blogFormRef = useRef();

  const notificationDispatch = useNotificationDispatchValue()

  const setTokenMutation = useMutation(setToken)

  let result = useQuery('blogs', getBlogs)

  const blogs = result.data

  useEffect(() => {
    if (blogs && !successShown) {
      notificationDispatch({ type: "GREEN_NOTIFICATION", payload: "successfully connected to blog"})
      setTimeout(() => {notificationDispatch({ type: "CLEAR_NOTIFICATION" })}, 5000)
      setSuccessShown(true);
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // console.log((user.token))
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
          <LoginForm
            setUser={setUser}
          />
        </Togglable>
      )}
      {user && <LogoutForm user={user} setUser={setUser} />}
      <br />
      {user && <Notification user={user} />}
      {user && (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm user={user} innerRef={blogFormRef} />
        </Togglable>
      )}
      <br />
      {user && <BlogList user={user} blogs={blogs} />}
    </div>
  );
};

export default App;
