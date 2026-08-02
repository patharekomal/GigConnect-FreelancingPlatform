package com.gigconnect.service;

import java.util.List;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.ReviewRequest;
import com.gigconnect.dtos.ReviewResponseDto;

public interface ReviewService {

    ApiResponse addReview(ReviewRequest request);
    
    List<ReviewResponseDto> getReviewsByFreelancer(Long freelancerId);

    ReviewResponseDto getReviewByProject(Long projectId);

}