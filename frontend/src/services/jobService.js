import * as jobApi from "../api/jobApi";

export const createJob = async(clientId, jobData) => {
    const response = await jobApi.postJob(clientId, jobData);
    return response.data;
};

export const fetchJobsByClient = async(clientId) => {
    const response = await jobApi.getJobsByClient(clientId);
    return response.data;
};