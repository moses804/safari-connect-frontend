import axios from './axios';

export const accommodationAPI = {
  getAll: () => axios.get('/accommodations'),
  getById: (id) => axios.get(`/accommodations/${id}`),
  search: (location, dates) => axios.get('/accommodations/search', { params: { location, dates } })
};