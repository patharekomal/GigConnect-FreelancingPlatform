import api from "./api";

export const getAllJobs = () => {
  return api.get("/jobs");
};

export const getJobById = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};

export const postJob = (clientId, jobData) => {
  return api.post(`/jobs/${clientId}`, jobData);
};

export const getJobsByClient = (clientId) => {
  return api.get(`/jobs/client/${clientId}`);
};