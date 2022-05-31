import { createSlice } from "@reduxjs/toolkit";
let timeoutID;

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const createNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(setNotification(""));
    }, time);
  };
};

export default notificationSlice.reducer;