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
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";

const User = () => {

  const dispatch = useDispatch();
  
  const users = useSelector((state) => {
    return [...state.users];
  });

  useEffect(() => {
    dispatch(initializeUsers());
  }, [users]);

  const id = useParams().id
  const userInfo = users.find(n => n.id == id) 

  if (!userInfo) {
    return (
      <div>
        <em>no user...</em>
      </div>
    )
  }

  return (
    <div>
      <h2>{userInfo.name}</h2>
      <ol>
      {userInfo.blogs.map((blog) => (
        <li key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
      </ol>
    </div>
  )
}

const UserList = () => {

  const dispatch = useDispatch();

  const users = useSelector((state) => {
    return [...state.users];
  });

  useEffect(() => {
    dispatch(initializeUsers());
  }, [users]);

  return (
    <div>
      <h2>Users List</h2>
      <ol>
      {users.map((user) => (
        <li key={user.id}>
        <Link to={`/users/${user.id}`}>{user.name}</Link> blogs created: <p>{user.blogs.length}</p>
        </li>
      ))}
      </ol>
    </div>
  )
};

const BlogApp = () => {
  const [successShown, setSuccessShown] = useState(false);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  const blogs = useSelector((state) => {
    return [...state.blogs];
  });

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [blogs]);

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

  return (
    <div>
      <h1>Blog app</h1>
      {user == null && <Notification />}
      {user == null && (
        <Togglable buttonLabel="log in blog">
          <LoginForm user={user} />
        </Togglable>
      )}
      {user && <LogoutForm user={user} />}
      <br />
      {user && <Notification />}
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

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/bloglist">Bloglist</Link>
        <Link to="/users">Blogusers</Link>
      </div>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<User />} />
        <Route path="/bloglist" element={<BlogApp />} />
      </Routes>
    </Router>
  );
};

export default App;
