import api from "./api";

export const getFreelancerReviews = (freelancerId) => {
  return api.get(`/reviews/freelancer/${freelancerId}`);
};
