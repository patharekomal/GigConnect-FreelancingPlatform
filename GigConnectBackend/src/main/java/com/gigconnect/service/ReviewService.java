package com.gigconnect.service;

import java.util.List;

import com.gigconnect.dtos.ReviewResponseDto;

public interface ReviewService {
	
	List<ReviewResponseDto>getFreelancerReviews(Long freelancerId);
}
