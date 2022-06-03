import { useState } from "react";
import PropTypes from "prop-types";
import { logInUser } from "../reducers/userReducer";
import { createNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { InputLabel, TextField, Button } from "@mui/material";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(logInUser({ username, password }));
    if (user) {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <InputLabel htmlFor="username">username</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <InputLabel htmlFor="password">password</InputLabel>
        <TextField
          variant="outlined"
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button variant="contained" type="submit" id="login-button">
        login
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};
