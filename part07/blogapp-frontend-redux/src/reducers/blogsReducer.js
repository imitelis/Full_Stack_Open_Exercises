import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlogs: (state, action) => {
      state.push(action.payload);
    },
    prependBlogs: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    refreshBlogs: (state, action) => {
      return state.filter((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: action.payload.likes }
          : blog
      );
    },
    setBlogs: (state, action) => {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const { appendBlogs, prependBlogs, refreshBlogs, setBlogs } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(newObject);
    dispatch(appendBlogs(newBlog));
  };
};

export const destroyBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.getOne(id);
    dispatch(prependBlogs(deletedBlog));
    await blogService.deleteBlog(id);
  };
};

export const likeBlog = (id, newObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(id, newObject);
    dispatch(refreshBlogs(updatedBlog));
  };
};

export const setBlogsToken = (token) => {
  return async (dispatch) => {
    blogService.setToken(token);
  };
};

export default blogSlice.reducer;
