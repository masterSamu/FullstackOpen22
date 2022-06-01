import { Link } from "react-router-dom";

const NavigationBar = ({ user, logOut }) => {
  return (
    <div className="navigation">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <span>
        {user.name} logged in <button onClick={logOut}>logout</button>
      </span>
    </div>
  );
};

export default NavigationBar;
