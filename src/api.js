import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

const auth = {
  username: 'admin',
  password: 'secret',
};

export const getMedicines = (params) => api.get('/medicines', { params });
export const createMedicine = (data) => api.post('/medicines', data, { auth });
export const updateMedicine = (id, data) => api.put(`/medicines/${id}`, data, { auth });
export const deleteMedicine = (id) => api.delete(`/medicines/${id}`, { auth });