import axios from "./axios";

export const transportAPI = {
  getAll: () => axios.get("/transports"),
  getById: (id) => axios.get(`/transports/${id}`),
  create: (data) => axios.post("/transports", data),
  update: (id, data) => axios.patch(`/transports/${id}`, data),
  delete: (id) => axios.delete(`/transports/${id}`),
  search: (from, to, date) =>
    axios.get("/transports/search", { params: { from, to, date } }),
};
