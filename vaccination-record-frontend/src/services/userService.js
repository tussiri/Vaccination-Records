// import api from "./api";

// export const register = (userData) => {
//   return api.post("/users/register", userData);
// };

// export const login = (credentials) => {
//   return api.post("/users/login", credentials);
// };

import api from "./api";

// export const register = (userData) => {
//   return api.post("/users/register", userData);
// };

export const register = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const login = (credentials) => {
//   return api.post("/users/login", credentials);
// };

export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};
