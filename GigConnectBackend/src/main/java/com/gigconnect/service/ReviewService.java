package com.gigconnect.service;

import java.util.List;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.ReviewRequest;
import com.gigconnect.dtos.ReviewResponseDto;

import jakarta.validation.Valid;

public interface ReviewService {
	
	List<ReviewResponseDto>getFreelancerReviews(Long freelancerId);

	ApiResponse addReview(Long projectId, @Valid ReviewRequest dto);

	ReviewResponseDto getReviewByProject(Long projectId);
}
