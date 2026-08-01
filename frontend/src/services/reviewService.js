import * as reviewApi from "../api/reviewApi";

export const submitReview = async (reviewData) => {
    const response = await reviewApi.addReview(reviewData);
    return response.data;
};

export const fetchReviewsByFreelancer = async (freelancerId) => {
    const response = await reviewApi.getReviewsByFreelancer(freelancerId);
    return response.data;
};

export const fetchReviewByProject = async (projectId) => {
    const response = await reviewApi.getReviewByProject(projectId);
    return response.data;
};