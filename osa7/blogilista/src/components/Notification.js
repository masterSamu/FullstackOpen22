import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

export default function Notification() {
  const notification = useSelector((state) => state.notification);
  if (!notification) return null;

  return <Alert severity={notification.type}>{notification.message}</Alert>;
}
