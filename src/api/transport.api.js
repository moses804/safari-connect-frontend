import axios from './axios';

export const transportAPI = {
  getAll: () => axios.get('/transports'),
  getById: (id) => axios.get(`/transports/${id}`),
  search: (from, to, date) => axios.get('/transports/search', { params: { from, to, date } })
};