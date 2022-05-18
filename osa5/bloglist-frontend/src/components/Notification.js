import React from "react";
import PropTypes from "prop-types";

export default function Notification({ type, message }) {
  return <div className={type}>{message}</div>;
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
