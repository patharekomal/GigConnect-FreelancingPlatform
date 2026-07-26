import api from "./api";

export const getMyProjects = (freelancerId) => {
  return api.get(`/projects/freelancer/${freelancerId}`);
};

export const getProjectById = (projectId) => {
  return api.get(`/projects/${projectId}`);
};

export const submitWork = (projectId, data) => {
  return api.put(`/projects/${projectId}/submit-work`, data);
};

export const getProjectsByClient = (clientId) => {
    return api.get(`/projects/client/${clientId}`);
};

export const approveProject = (projectId) => {
    return api.patch(`/projects/${projectId}/approve`);
};

