// // authentication.js

// import api from "./api";

// export const login = async (credentials) => {
//   try {
//     const response = await api.post("/login", credentials);
//     const user = response.data.user;
//     const token = response.data.token;
//     localStorage.setItem("token", token);
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     return user;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

// export const logout = () => {
//   localStorage.removeItem("token");
//   delete api.defaults.headers.common["Authorization"];
// };

import api from "./api";

export const login = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    const user = response.data.user;
    const token = response.data.token;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
};
