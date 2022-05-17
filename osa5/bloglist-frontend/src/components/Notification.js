import React from 'react';

export default function Notification({type, message}) {
  return (
    <div className={type}>{message}</div>
  )
}
