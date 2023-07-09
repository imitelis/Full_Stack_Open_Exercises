import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import usersReducer from "./reducers/usersReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    users: usersReducer,
    user: userReducer,
  },
});

export default store;
