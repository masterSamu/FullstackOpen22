import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/login";
import blogService from "../services/blogs";
import { createNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserReducer(state, action) {
      return action.payload;
    },
  },
});

export const { setUserReducer } = userSlice.actions;

export const logInUser = (user) => {
  return async (dispatch) => {
    try {
      const loggedUser = await userService.login(user);
      if (loggedUser) {
        window.localStorage.setItem(
          "loggedBloglistUser",
          JSON.stringify(loggedUser)
        );
        blogService.setToken(loggedUser.token);
        dispatch(setUserReducer(loggedUser));
      }
    } catch (error) {
      dispatch(
        createNotification(
          { type: "error", message: error.response.data.error },
          5000
        )
      );
    }
  };
};

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(setUserReducer(user));
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch(setUserReducer(null));
    window.localStorage.removeItem("loggedBloglistUser");
  };
};

export default userSlice.reducer;
