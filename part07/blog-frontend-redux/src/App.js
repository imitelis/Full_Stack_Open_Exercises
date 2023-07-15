import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import {
  setGreenNotification,
  setRedNotification,
} from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";

import NavigationBar from "./components/NavigationBar";
import Notification from "./components/Notification";
import LogupForm from "./components/LogupForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import UserList from "./components/UserList";
import User from "./components/User";
import Account from "./components/Account";

const App = () => {

  const [successShown, setSuccessShown] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  const blogs = useSelector((state) => {
    return [...state.blogs];
  });

  const users = useSelector((state) => {
    return [...state.users];
  });

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch, blogs]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch, users]);

  useEffect(() => {
    dispatch(initializeBlogs())
      .then(() => {
        if (!successShown) {
          dispatch(setGreenNotification("successfully connected to blog"));
          setSuccessShown(true);
        }
      })
      .catch(() => {
        if (!successShown) {
          dispatch(setRedNotification("fatal error: lost connection to blog"));
          setSuccessShown(false);
        }
      });
  }, [dispatch, setSuccessShown, successShown]);

  const usermatch = useMatch("/users/:id");

  const userInfo = usermatch
    ? users.find((user) => user.id === usermatch.params.id)
    : null;

  const blogmatch = useMatch("/blogs/:id");

  const blogInfo = blogmatch
    ? blogs.find((blog) => blog.id === blogmatch.params.id)
    : null;

  return (
    <div>
      <h1>Blog app</h1>
      <Notification />
      <NavigationBar user={user} />

      <Routes>
        <Route path="/" element={<BlogList user={user} blogs={blogs} />} />
        <Route path="/blogs" element={<BlogList user={user} blogs={blogs} />} />
        <Route path="/users" element={<UserList user={user} users={users} />} />
        <Route path="/account" element={<Account user={user} users={users} />} />
        <Route path="/logup" element={<LogupForm user={user} />} />
        <Route path="/login" element={<LoginForm user={user} />} />
        <Route path="/blogs/:id" element={<Blog user={user} blogInfo={blogInfo} />} />
        <Route path="/users/:id" element={<User user={user} userInfo={userInfo} />} />
      </Routes>
    </div>
  );
};

export default App;
