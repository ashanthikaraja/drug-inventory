import axios from './axios';

const orderService = {
  getAllOrders: async (params = {}) => {
    const response = await axios.get(`orders/`, { params });
    return response.data;
  },
  getOrderById: async (id) => {
    const response = await axios.get(`orders/${id}/`);
    return response.data;
  },
  createOrder: async (data) => {
    const transformedData = {
      ...data,
      drug_id: data.drug,
      supplier_id: data.supplier
    };
    const response = await axios.post(`orders/`, transformedData);
    return response.data;
  },
  updateOrder: async (id, data) => {
    const transformedData = {
      ...data,
      drug_id: data.drug,
      supplier_id: data.supplier
    };
    const response = await axios.put(`orders/${id}/`, transformedData);
    return response.data;
  },
  deleteOrder: async (id) => {
    await axios.delete(`orders/${id}/`);
  },
};

export default orderService;