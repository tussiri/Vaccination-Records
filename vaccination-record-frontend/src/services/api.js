// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5001/api",
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // Replace with your API's base URL
  // headers: {
  //   Authorization: `Bearer${localStorage.getItem("token")}`,
  // },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
