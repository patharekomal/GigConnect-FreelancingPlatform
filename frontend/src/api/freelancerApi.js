import api from "./api";

export const getDashboard = (freelancerId) => {
  return api.get(`/freelancers/${freelancerId}/dashboard`);
};

export const getProfile = (freelancerId) => {
  return api.get(`/freelancers/${freelancerId}`);
};