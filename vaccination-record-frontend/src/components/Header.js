import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1 }}
        >
          Vaccination Records
        </Typography>
        {authState.isAuthenticated ? (
          <>
            <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
              {`Welcome, ${authState.user.firstName} ${authState.user.lastName}`}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
