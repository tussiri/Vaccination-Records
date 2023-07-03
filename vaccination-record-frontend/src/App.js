import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { AuthContext } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { login as loginApi } from "./services/api";

const theme = createTheme();

const App = () => {
  const [authState, setAuthState] = useState({
    status: "pending",
    error: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthState({ status: "authenticated", error: null, user: null });
    } else {
      setAuthState({ status: "anonymous", error: null, user: null });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const user = await loginApi({ email, password });
      setAuthState({ status: "authenticated", error: null, user: user });
    } catch (error) {
      console.error(error);
      const message =
        error.message || "Something went wrong while attempting to login";
      setAuthState({ status: "anonymous", error: message, user: null });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ status: "anonymous", error: null, user: null });
  };

  const contextValue = {
    authState,
    setAuthState,
    login,
    logout,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthContext.Provider value={contextValue}>
          <UserProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
              </Route>

              {/* <Route
                path="/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
              /> */}
            </Routes>
          </UserProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
