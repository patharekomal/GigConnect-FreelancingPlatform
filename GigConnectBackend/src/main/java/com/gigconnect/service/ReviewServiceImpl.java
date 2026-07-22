package com.gigconnect.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ApiException;
import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.ReviewRequest;
import com.gigconnect.dtos.ReviewResponseDto;
import com.gigconnect.entities.Project;
import com.gigconnect.entities.Review;
import com.gigconnect.enums.ProjectStatus;
import com.gigconnect.repository.ProjectRepository;
import com.gigconnect.repository.ReviewRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service 
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository reviewRepository;
	private final ProjectRepository projectRepository;
	private final ModelMapper modelMapper;

	
	@Override
	public List<ReviewResponseDto>getFreelancerReviews(Long freelancerId) {

	    List<Review> reviews =reviewRepository.findByFreelancerId(
	                            freelancerId);
	    
	    List<ReviewResponseDto> list=new ArrayList<>();
	    
	    for(Review review:reviews)
	    {
	    	list.add(modelMapper.map(review, ReviewResponseDto.class));
	    }
	    
	    return list;
	}


	@Override
	public ApiResponse addReview(Long projectId, @Valid ReviewRequest dto) {
		//Find Project
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id : " + projectId));
        
        //Project should be completed
        if(project.getStatus() != ProjectStatus.COMPLETED) {
            throw new ApiException("Review can be given only after project completion.");
        }
        
        //Check review already exists
        if(reviewRepository.findByProjectId(projectId).isPresent()) {
            throw new ApiException("Review already submitted for this project.");
        }
        
        Review review = new Review();

        review.setProject(project);
        review.setClient(project.getClient());
        review.setFreelancer(project.getFreelancer());

        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setReviewDate(LocalDate.now());

        reviewRepository.save(review);

        return new ApiResponse(
                "Success",
                "Review submitted successfully.");
	}


	@Override
	public ReviewResponseDto getReviewByProject(Long projectId) {
		//Find Project
	    Project project = projectRepository.findById(projectId)
	            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id : " + projectId));
	    
	    //Find Review
	    Review review = reviewRepository.findByProject(project)
	            .orElseThrow(() ->new ResourceNotFoundException("Review not found for this project."));
	    
	    ReviewResponseDto dto = modelMapper.map(review, ReviewResponseDto.class);
	    
	    dto.setClientName(review.getClient().getUserDetails().getFirstName() + " " + review.getClient().getUserDetails().getLastName());
	    
	    dto.setFreelancerName(review.getFreelancer().getUserDetails().getFirstName() + " "+ review.getFreelancer().getUserDetails().getLastName());

		return dto;
	}
}
