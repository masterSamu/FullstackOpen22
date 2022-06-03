import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationBar = ({ user, logOut }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="secondary">
          <Link to="/">blogs</Link>
        </Button>
        <Button color="inherit">
          <Link to="/users">users</Link>
        </Button>
        <span>
          {user.name} logged in{" "}
          <Button variant="outlined" color="inherit" onClick={logOut}>
            logout
          </Button>
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
