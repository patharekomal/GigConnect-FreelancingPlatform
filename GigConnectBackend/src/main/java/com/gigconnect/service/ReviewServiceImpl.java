package com.gigconnect.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ApiException;
import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.ReviewRequest;
import com.gigconnect.dtos.ReviewResponseDto;
import com.gigconnect.entities.Freelancer;
import com.gigconnect.entities.Project;
import com.gigconnect.entities.Review;
import com.gigconnect.enums.ProjectStatus;
import com.gigconnect.repository.FreelancerRepository;
import com.gigconnect.repository.ProjectRepository;
import com.gigconnect.repository.ReviewRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProjectRepository projectRepository;
    private final FreelancerRepository freelancerRepository;
    private final ModelMapper mapper;

    @Override
    public ApiResponse addReview(ReviewRequest request) {

    	// Fetch Project
    	Project project = projectRepository.findById(request.getProjectId())
    	        .orElseThrow(() ->
    	                new ResourceNotFoundException("Invalid Project Id"));

    	// Allow review only after completion
    	if(project.getStatus() != ProjectStatus.COMPLETED)
    	{
    	    throw new ApiException("Review can only be given for completed projects.");
    	}

    	// Prevent duplicate review
    	if(reviewRepository.existsByProjectId(project.getId()))
    	{
    	    throw new ApiException("Review already submitted for this project.");
    	}

    	// Create Review
    	Review review = new Review();

    	review.setProject(project);
    	review.setClient(project.getClient());
    	review.setFreelancer(project.getFreelancer());

    	review.setRating(request.getRating());
    	review.setComment(request.getComment());

    	// Save Review
    	reviewRepository.save(review);

    	// Recalculate Average Rating
    	Double average = reviewRepository.getAverageRating(project.getFreelancer().getId());

    	// Update Freelancer Rating
    	Freelancer freelancer = project.getFreelancer();

    	freelancer.setRating(average.floatValue());
    	
    	

    	System.out.println("Average Rating = " + average);
    	System.out.println("Freelancer Id = " + project.getFreelancer().getId());

    	freelancerRepository.save(freelancer);
    	
    	System.out.println("Saved Rating = " + freelancer.getRating());

    	return new ApiResponse("Success","Review submitted successfully.");

    }
    
    @Override
    public List<ReviewResponseDto> getReviewsByFreelancer(Long freelancerId) {

        List<Review> reviews =
                reviewRepository.findByFreelancerId(freelancerId);

        List<ReviewResponseDto> response = new ArrayList<>();

        for (Review review : reviews) {

            ReviewResponseDto dto = new ReviewResponseDto();

            dto.setReviewId(review.getReviewId());
            dto.setRating(review.getRating());
            dto.setComment(review.getComment());
            dto.setReviewDate(review.getReviewDate());

            dto.setProjectId(review.getProject().getId());
            dto.setProjectTitle(review.getProject().getJob().getTitle());

            dto.setFreelancerId(review.getFreelancer().getId());

            dto.setFreelancerName(
                    review.getFreelancer().getUserDetails().getFirstName()
                            + " "
                            + review.getFreelancer().getUserDetails().getLastName());
            
            dto.setClientName(
            	    review.getClient().getUserDetails().getFirstName()
            	    + " "
            	    + review.getClient().getUserDetails().getLastName()
            	);

            response.add(dto);
        }

        return response;
    }
    
    @Override
    public ReviewResponseDto getReviewByProject(Long projectId) {

        Review review = reviewRepository.findByProjectId(projectId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found"));

        ReviewResponseDto dto = new ReviewResponseDto();

        dto.setReviewId(review.getReviewId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setReviewDate(review.getReviewDate());

        dto.setProjectId(review.getProject().getId());
        dto.setProjectTitle(review.getProject().getJob().getTitle());

        dto.setFreelancerId(review.getFreelancer().getId());

        dto.setFreelancerName(
                review.getFreelancer().getUserDetails().getFirstName()
                        + " "
                        + review.getFreelancer().getUserDetails().getLastName());

        return dto;
    }
}