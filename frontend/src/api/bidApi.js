import api from "./api";

// Submit a bid
export const submitBid = (freelancerId, bidData) => {
  return api.post(`/bids/${freelancerId}`, bidData);
};
