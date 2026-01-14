import axios from './axios';

export const bookingAPI = {
  create: (bookingData) => axios.post('/bookings', bookingData),
  getUserBookings: () => axios.get('/bookings/my-bookings'),
  getById: (id) => axios.get(`/bookings/${id}`),
  cancel: (id) => axios.delete(`/bookings/${id}`)
};