import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Link
  } from "react-router-dom";

import { initializeUsers } from "../reducers/usersReducer";

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
        <h2>Users list</h2>
        <ol>
        {users.map((user) => (
          <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name} as {user.username}</Link><p> blogs created: {user.blogs.length}</p>
          </li>
        ))}
        </ol>
      </div>
    )
};

export default UserList;