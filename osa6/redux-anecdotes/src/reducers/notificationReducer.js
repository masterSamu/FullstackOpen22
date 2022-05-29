import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return state = action.payload;
    },
    deleteNotification(state, action) {
      return state = "";
    },
  },
});

export const { createNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
