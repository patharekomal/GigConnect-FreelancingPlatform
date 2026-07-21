package com.gigconnect.service;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.freelancer.FreelancerDashboardResponse;
import com.gigconnect.dtos.freelancer.FreelancerResponse;
import com.gigconnect.dtos.freelancer.UpdateFreelancerProfile;
import com.gigconnect.entities.Freelancer;
import com.gigconnect.enums.BidStatus;
import com.gigconnect.enums.ProjectStatus;
import com.gigconnect.repository.BidRepository;
import com.gigconnect.repository.FreelancerRepository;
import com.gigconnect.repository.ProjectRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@Transactional
@RequiredArgsConstructor
public class FreelancerServiceImpl implements FreelancerService{
	
	// Constructor based DI
   private final FreelancerRepository freelancerRepository;
   private final ModelMapper modelMapper;
   private final BidRepository bidRepository;
   private final ProjectRepository projectRepository;
   
   
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
	
	@Override
	public FreelancerDashboardResponse getDashboard(Long freelancerId) {

	    Freelancer freelancer = freelancerRepository.findById(freelancerId)
	            .orElseThrow(() ->
	            new ResourceNotFoundException("Invalid Freelancer Id"));

	    FreelancerDashboardResponse dto =
	            new FreelancerDashboardResponse();

	    dto.setTotalBids(
	            bidRepository.countByFreelancerId(freelancerId));

	    dto.setPendingBids(
	            bidRepository.countByFreelancerIdAndStatus(
	                    freelancerId,
	                    BidStatus.PENDING));

	    dto.setActiveProjects(
	            projectRepository.countByFreelancerIdAndStatus(
	                    freelancerId,
	                    ProjectStatus.IN_PROGRESS));

	    dto.setSubmittedProjects(
	            projectRepository.countByFreelancerIdAndStatus(
	                    freelancerId,
	                    ProjectStatus.SUBMITTED));

	    dto.setCompletedProjects(
	            projectRepository.countByFreelancerIdAndStatus(
	                    freelancerId,
	                    ProjectStatus.COMPLETED));

	    dto.setRating(freelancer.getRating());

	    return dto;
	}

}
