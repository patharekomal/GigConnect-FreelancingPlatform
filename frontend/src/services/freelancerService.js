import * as freelancerApi from "../api/freelancerApi";

export const fetchFreelancerById = async (freelancerId) => {
    const response = await freelancerApi.getFreelancerById(freelancerId);
    return response.data;
};