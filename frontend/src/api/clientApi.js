import api from "./api";

export const getClientProfile = (clientId) => {
  return api.get(`/client/${clientId}`);
};

export const getMyProfile = () =>
    api.get("/client/profile");

export const getDashboard = (clientId) => {
    return api.get(`/client/dashboard/${clientId}`);
};