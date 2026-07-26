import * as bidApi from "../api/bidApi";

export const fetchBidsByJob = async (jobId) => {
    const response = await bidApi.getBidsByJob(jobId);
    return response.data;
};

export const acceptBid = async (bidId) => {
  const response = await bidApi.acceptBid(bidId);
  return response.data;
};