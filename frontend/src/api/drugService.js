// src/api/drugService.js
import axios from './axios';

const drugService = {
  getAllDrugs: async (params = {}) => {
    const response = await axios.get('drugs/', { params });
    return response.data;
  },
  getDrugById: async (id) => {
    const response = await axios.get(`drugs/${id}/`);
    return response.data;
  },
  createDrug: async (data) => {
    const response = await axios.post(`drugs/`, data);
    return response.data;
  },
  updateDrug: async (id, data) => {
    const response = await axios.put(`drugs/${id}/`, data);
    return response.data;
  },
  deleteDrug: async (id) => {
    await axios.delete(`drugs/${id}/`);
  },
};

export default drugService;