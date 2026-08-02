import api from "./api";

export const getClientProfile = (clientId) => {
  return api.get(`/client/${clientId}`);
};

export const getClientById = (clientId) => {
  return api.get(`/client/${clientId}`);
};

export const getDashboard = (clientId) => {
    return api.get(`/client/dashboard/${clientId}`);
};