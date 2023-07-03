import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",

});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

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
    throw error
  }
};

// Replace USER_ID with the actual user ID from your authentication system
// const USER_ID = "USER_ID";

export const getVaccinationRecords = (userId) => {
  return api.get(`/users/${userId}/vaccinationRecords`);
};

export const addVaccinationRecord = (userId, record) => {
  return api.post(`/users/${userId}/vaccinationRecords`, record);
};

export const updateVaccinationRecord = (userId, record) => {
  return api.put(`/users/${userId}/vaccinationRecords/${userId}`, record);
};

export const deleteVaccinationRecord = (userId) => {
  return api.delete(`/users/${userId}/vaccinationRecords/${userId}`);
};

export default api;
