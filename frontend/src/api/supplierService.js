// src/api/supplierService.js
import axios from './axios';

const supplierService = {
  getAllSuppliers: async (params = {}) => {
    const response = await axios.get('suppliers/', { params });
    return response.data;
  },
  getSupplierById: async (id) => {
    const response = await axios.get(`suppliers/${id}/`);
    return response.data;
  },
  createSupplier: async (data) => {
    const response = await axios.post('suppliers/', data);
    return response.data;
  },
  updateSupplier: async (id, data) => {
    const response = await axios.put(`suppliers/${id}/`, data);
    return response.data;
  },
  deleteSupplier: async (id) => {
    await axios.delete(`suppliers/${id}/`);
  },
};

export default supplierService;