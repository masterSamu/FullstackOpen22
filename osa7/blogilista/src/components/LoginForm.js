import { useState } from "react";
import PropTypes from "prop-types";
import { logInUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(logInUser({ username, password }));
      if (user) {
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      dispatch(setNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};
