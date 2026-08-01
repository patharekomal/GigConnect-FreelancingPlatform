import api from "./api";

export const addReview = (reviewData) => {
    return api.post("/reviews", reviewData);
};

export const getReviewsByFreelancer = (freelancerId) => {
    return api.get(`/reviews/freelancer/${freelancerId}`);
};

export const getReviewByProject = (projectId) => {
    return api.get(`/reviews/project/${projectId}`);
};