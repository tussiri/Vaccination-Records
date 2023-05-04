import axios from "axios";

const api = axios.create({
  baseURL: "https:localhost:5001/api", // Replace with your API's base URL
});

export const getVaccinationRecords = (userId) => {
  return api.get(`/vaccinationRecords/${userId}`);
};

export const addVaccinationRecord = (userId, record) => {
  return api.post(`/vaccinationRecords/${userId}`, record);
};

export const updateVaccinationRecord = (userId, recordId, record) => {
  return api.put(`/vaccinationRecords/${userId}/${recordId}`, record);
};

export const deleteVaccinationRecord = (userId, recordId) => {
  return api.delete(`/vaccinationRecords/${userId}/${recordId}`);
};
