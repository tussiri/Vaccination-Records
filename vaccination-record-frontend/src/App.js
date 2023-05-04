// import React, { useState, useCallback } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { CssBaseline, Container } from "@mui/material";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import { UserProvider } from "./contexts/UserContext";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AuthProvider } from "./contexts/AuthContext";

// function App() {
//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     user: null,
//     token: localStorage.getItem("token"),
//   });

//   const login = useCallback((userData) => {
//     const { firstName } = userData;
//     const userWithFirstName = { ...userData, firstName };

//     localStorage.setItem("userData", JSON.stringify(userWithFirstName));
//     setAuthState((prevState) => ({
//       ...prevState,
//       isAuthenticated: true,
//       user: userWithFirstName,
//     }));

//     // Return an object with `data` and `status` properties
//     return { data: userData, status: 200 };
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("userData");
//     setAuthState({ isAuthenticated: false, user: null });
//   };

//   return (
//     <AuthProvider authState={authState} login={login} logout={logout}>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <UserProvider>
//           <Router>
//             <Routes>
//               <Route path="/" element={<Login />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//             </Routes>
//           </Router>
//         </UserProvider>
//       </LocalizationProvider>
//     </AuthProvider>
//   );
// }

// export default App;

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
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email, password),
      });

      if (response.status === 401) {
        throw new Error("Invalid credentials");
      }

      const { token, user } = await response.json();
      localStorage.setItem("token", token);
      setAuthState({ status: "authenticated", error: null, user: user });
      return user;
    } catch (error) {
      console.error(error);
      const message = error.message || "Something went wrong!";
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
