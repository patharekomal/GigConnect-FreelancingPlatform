package com.gigconnect.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.dtos.ReviewResponseDto;
import com.gigconnect.entities.Review;
import com.gigconnect.repository.ReviewRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository reviewRepository;
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
}
