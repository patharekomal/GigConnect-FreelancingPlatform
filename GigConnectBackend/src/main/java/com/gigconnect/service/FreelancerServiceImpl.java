package com.gigconnect.service;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.freelancer.FreelancerResponse;
import com.gigconnect.entities.Freelancer;
import com.gigconnect.repository.FreelancerRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@Transactional
@RequiredArgsConstructor
public class FreelancerServiceImpl implements FreelancerService{
	
	// Constructor based DI
   private final FreelancerRepository repo;
   private final ModelMapper modelMapper;
   
   
	@Override
	public FreelancerResponse getFreelancerDetails(Long id)
	{
		
		// Fetch freelancer from database
		Freelancer freelancer=repo.findById(id)
		.orElseThrow(()->
		       new ResourceNotFoundException("Invalid freelancer Id :"+ id));
		
		// Convert entity to DTO
		FreelancerResponse dto =
		        modelMapper.map(freelancer, FreelancerResponse.class);
		
		// User details are stored in User entity
		dto.setFirstName(freelancer.getUserDetails().getFirstName());
		dto.setLastName(freelancer.getUserDetails().getLastName());
		dto.setEmail(freelancer.getUserDetails().getEmail());

		return dto;
	}

}
