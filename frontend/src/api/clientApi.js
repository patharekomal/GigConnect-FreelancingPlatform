import api from "./api";

export const getClientProfile = (clientId) => {
  return api.get(`/client/${clientId}`);
};

export const getClientById = (clientId) => {
  return api.get(`/client/${clientId}`);
};