package com.gigconnect.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.freelancer.BidRequest;
import com.gigconnect.entities.Bid;
import com.gigconnect.entities.Freelancer;
import com.gigconnect.entities.Job;
import com.gigconnect.repository.BidRepository;
import com.gigconnect.repository.FreelancerRepository;
import com.gigconnect.repository.JobRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
@Service 
@Transactional
@RequiredArgsConstructor
public class BidServiceImpl implements BidService {
	
	private final BidRepository bidRepository;
	private final ModelMapper modelMapper;
	private  final FreelancerRepository freelancerRepository;
	private final  JobRepository jobRepository;

	@Override
	public ApiResponse submitBid(Long freelancerId, BidRequest bid) {
		// TODO Auto-generated method stub
		//find Freelancer object
		Freelancer freelancer=freelancerRepository.findById(freelancerId)
				.orElseThrow(()-> new ResourceNotFoundException("FreelancerId is invalid "));
		//find job Object (to add reference to bids )
		Job job=jobRepository.findById(bid.getJobId())
				.orElseThrow(()-> new ResourceNotFoundException("JobId is invalid "));
		
		//create empty object
		Bid obj=new Bid();
		obj.setAmount(bid.getAmount());
		obj.setFreelancer(freelancer);
		obj.setDurationDays(bid.getDuration());
		obj.setJob(job);
		obj.setProposal(bid.getProposal());
		
		Bid b=bidRepository.save(obj);
		if(b==null)
		{
			throw new ResourceNotFoundException("Bid Not added to database  ");
		}
		
		return new ApiResponse("Successful","Bid Submitted SuccessFully");
	}

}
