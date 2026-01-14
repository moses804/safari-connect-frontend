// src/api/accommodation.api.js
import axios from './axios.js'

export const accommodationAPI = {
  getAll: () => axios.get('/accommodations'),
  getById: (id) => axios.get(`/accommodations/${id}`),
  create: (data) => axios.post('/accommodations', data),
  update: (id, data) => axios.put(`/accommodations/${id}`, data),
  delete: (id) => axios.delete(`/accommodations/${id}`),
}
