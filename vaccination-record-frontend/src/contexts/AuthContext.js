import React, { createContext, useEffect, useState, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    status: "pending",
    error: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/auth/me")
        .then((response) => {
          setAuthState({
            status: "done",
            error: null,
            user: response.data.user,
          });
        })
        .catch((error) => {
          console.error("Auth error:", error);
          setAuthState({
            status: "done",
            error: error.message,
            user: null,
          });
        });
    } else {
      setAuthState({
        status: "done",
        error: null,
        user: null,
      });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const token = response.data.token;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({
        status: "authenticated",
        error: null,
        user: response.data.user,
        token: token, // Add this line to include the token in the authState
      });
    } catch (error) {
      console.error("Login error:", error);
      setAuthState({
        status: "done",
        error: error.message,
        user: null,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setAuthState({
      status: "done",
      error: null,
      user: null,
    });
  };

  const value = {
    authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuthContext };
