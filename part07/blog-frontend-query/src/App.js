import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Routes, Route, useMatch } from "react-router-dom";

import { useUserValue, useUserDispatchValue } from './UserContext'
import { useNotificationDispatchValue } from './NotificationContext'

import NavigationBar from "./components/NavigationBar";
import Notification from "./components/Notification";
import LogupForm from "./components/LogupForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import UserList from "./components/UserList";
import User from "./components/User";
import Account from "./components/Account";

import { setToken, getBlogs, createBlog, deleteBlog, updateBlog } from "./requests/blogs"
import { getUsers, createUser, deleteUser, updateUser } from "./requests/users"

const App = () => {

  const [successShown, setSuccessShown] = useState(false);

  const userDispatch = useUserDispatchValue();
  const notificationDispatch = useNotificationDispatchValue();

  const queryClient = useQueryClient();

  let blogsResult = useQuery('blogs', getBlogs);
  let usersResult = useQuery('users', getUsers);

  const user = useUserValue();

  const blogs = blogsResult.data;
  const users = usersResult.data;

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

  const newUserMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  const removeUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  useEffect(() => {
    if (blogs && !successShown) {
      notificationDispatch({ type: "GREEN_NOTIFICATION", payload: "successfully connected to blog" })
      setSuccessShown(true);
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // console.log("useEffect user", user)
      userDispatch({ type: "BEGIN_SESSION", payload: user })
      setTokenMutation.mutate(user.token);
    }
  }, [userDispatch]);

  const blogmatch = useMatch("/blogs/:id");

  const blogInfo = blogmatch
    ? blogs.find((blog) => blog.id === blogmatch.params.id)
    : null;

  const usermatch = useMatch("/users/:id");

  const userInfo =usermatch
    ? users.find((user) => user.id === usermatch.params.id)
    : null;

  if (blogsResult.isLoading || !blogs) {
    return (
      <div>
        <h1>Blog</h1>
        <NavigationBar user={user} />

        <Notification />
        <em>loading data...</em>
      </div>
    )
  }  

  return (
    <div>
      <h1>Blog</h1>
      <Notification />
      <NavigationBar user={user} />

      <Routes>
        <Route path="/" element={<BlogList user={user} blogs={blogs} />} />
        <Route path="/blogs" element={<BlogList user={user} blogs={blogs} newBlogMutation={newBlogMutation} />} />
        <Route path="/users" element={<UserList user={user} users={users} />} />
        <Route path="/account" element={<Account user={user} users={users} removeUserMutation={removeUserMutation} updateUserMutation={updateUserMutation} />} />
        <Route path="/logup" element={<LogupForm user={user} newUserMutation={newUserMutation} />} />
        <Route path="/login" element={<LoginForm user={user} />} />
        <Route path="/blogs/:id" element={<Blog user={user} blogInfo={blogInfo} removeBlogMutation={removeBlogMutation} updateBlogMutation={updateBlogMutation} />}/>
        <Route path="/users/:id" element={<User user={user} userInfo={userInfo} />} />
      </Routes>
      
    </div>
  );
};

export default App;
