import { createSlice } from "@reduxjs/toolkit";

import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload.sort((a, b) => b.blogs.length - a.blogs.length);
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const newUser = (newObject) => {
  return async (dispatch) => {
    await usersService.createUser(newObject);
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const destroyUser = (id) => {
  return async (dispatch) => {
    await usersService.deleteUser(id);
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const renewUser = (id, newObject) => {
  return async (dispatch) => {
    await usersService.updateUser(id, newObject);
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export default usersSlice.reducer;
