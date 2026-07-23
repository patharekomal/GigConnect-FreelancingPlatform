import api from "./api";

// Submit a bid
export const submitBid = (freelancerId, bidData) => {
  return api.post(`/bids/${freelancerId}`, bidData);
};

// Get My Bids
export const getMyBids = (freelancerId) => {
  return api.get(`/bids/${freelancerId}`);
};