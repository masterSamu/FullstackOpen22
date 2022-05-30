import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
let timeoutID;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    deleteNotification(state, action) {
      return "";
    },
  },
});

export const { createNotification, deleteNotification } =
  notificationSlice.actions;

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(deleteNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
