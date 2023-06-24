import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";

import {
  setGreenNotification,
  setRedNotification,
} from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";

import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import LogupForm from "./components/LogupForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import User from "./components/User";
import UserList from "./components/UserList";

const App = () => {

  const padding = {
    padding: 5
  }

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
  }, [blogs]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [users]);

  const [successShown, setSuccessShown] = useState(false);

  const dispatch = useDispatch();  

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
  }, [dispatch, setGreenNotification, setRedNotification, setSuccessShown]);

  const usermatch = useMatch('/users/:id')

  const userInfo = usermatch
  ? users.find(user => user.id === usermatch.params.id)
  : null

  const blogmatch = useMatch('/blogs/:id')

  const blogInfo = blogmatch
  ? blogs.find(blog => blog.id === blogmatch.params.id)
  : null

  return (
    <div>
      <h1>Blog app</h1>
      <Notification />
      <div className="navbar">
        <Link to="/blogs">Blogs</Link>
        <Link to="/users">Users</Link>
        {user == null && <Link to="/logup">Logup</Link>}
        {user == null && <Link to="/login">Login</Link>}
        {user && <LogoutForm user={user} />}
      </div>

      <Routes>
        <Route path="/" element={<BlogList user={user} blogs={blogs} />} />
        <Route path="/blogs" element={<BlogList user={user} blogs={blogs} />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/logup" element={<LogupForm user={user}/>} />
        <Route path="/login" element={<LoginForm user={user}/>} />
        <Route path="/users/:id" element={<User userInfo={userInfo} />} />
        <Route path="/blogs/:id" element={<Blog blogInfo={blogInfo} user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
