import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return (state = action.payload);
    },
    deleteNotification(state, action) {
      return (state = "");
    },
  },
});

export const { createNotification, deleteNotification } =
  notificationSlice.actions;

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
