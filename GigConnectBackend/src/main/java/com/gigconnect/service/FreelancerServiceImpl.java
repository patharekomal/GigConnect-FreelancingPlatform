package com.gigconnect.service;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.freelancer.FreelancerResponse;
import com.gigconnect.dtos.freelancer.UpdateFreelancerProfile;
import com.gigconnect.entities.Freelancer;
import com.gigconnect.repository.FreelancerRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@Transactional
@RequiredArgsConstructor
public class FreelancerServiceImpl implements FreelancerService{
	
	// Constructor based DI
   private final FreelancerRepository freelancerRepository;
   private final ModelMapper modelMapper;
   
   
	@Override
	public FreelancerResponse getFreelancerDetails(Long id)
	{
		
		// Fetch freelancer from database
		Freelancer freelancer=freelancerRepository.findById(id)
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
	
	@Override
	public FreelancerResponse updateFreelancerDetails(Long id, UpdateFreelancerProfile req) {
		// TODO Auto-generated method stub
		FreelancerResponse dto=new FreelancerResponse();
		Freelancer freelancer = freelancerRepository.findById(id)
		        .orElseThrow(() ->
		                new ResourceNotFoundException("Invalid Freelancer ID"));
		
		freelancer.setProfession(req.getProfession());
		freelancer.setBio(req.getBio());
		freelancer.setHourlyRate(req.getHourlyRate());
		freelancer.setPortfolioLink(req.getPortfolioLink());
		freelancer.setSkills(req.getSkills());
		
		
		dto=modelMapper.map(freelancer,FreelancerResponse.class);
		dto.setFirstName(freelancer.getUserDetails().getFirstName());
		dto.setLastName(freelancer.getUserDetails().getLastName());
		dto.setEmail(freelancer.getUserDetails().getEmail());
		
		return dto;
	}

}
