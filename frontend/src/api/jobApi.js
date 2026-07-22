import api from "./api";

export const getAllJobs = () => {
  return api.get("/jobs");
};

export const getJobById = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};
