import api from "./api";

// Submit a bid
export const submitBid = (freelancerId, bidData) => {
  return api.post(`/bids/${freelancerId}`, bidData);
};

// Get My Bids
export const getMyBids = (freelancerId) => {
  return api.get(`/bids/${freelancerId}`);
};

//delete a bid
export const deleteBid = (bidId) => {
  return api.delete(`/bids/${bidId}`);
};

export const getBidById = (bidId) => {
  return api.get(`/bids/bid/${bidId}`);
};

export const updateBid = (bidId, bidData) => {
  return api.put(`/bids/${bidId}`, bidData);
};