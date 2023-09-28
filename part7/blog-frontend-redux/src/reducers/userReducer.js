import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    placeUser: (state, action) => {
      // console.log("here placeUser", action.payload)
      return action.payload;
    },
    clearUser: (state, action) => {
      return null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        return null;
      });
  },
});

export const { placeLogin, placeUser, clearUser } = loginSlice.actions;

export const loginAsync = createAsyncThunk(
  "login/loginAsync",
  async (credentials) => {
    const user = await loginService.login(credentials);
    // console.log(user);
    return user;
  }
);

export const beginSession = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await dispatch(loginAsync({ username, password }));
      dispatch(placeUser(user.payload));
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
    } catch (error) {
      dispatch(clearUser());
      window.localStorage.removeItem("loggedBlogUser");
    }
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(placeUser(user));
  };
};

export const endSession = () => {
  return async (dispatch) => {
    dispatch(clearUser());
    window.localStorage.removeItem("loggedBlogUser");
  };
};

export default loginSlice.reducer;
