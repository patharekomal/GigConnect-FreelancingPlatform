package com.gigconnect.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ApiException;
import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.freelancer.BidRequest;
import com.gigconnect.dtos.freelancer.BidResponse;
import com.gigconnect.dtos.freelancer.UpdateBidRequest;
import com.gigconnect.entities.Bid;
import com.gigconnect.entities.Freelancer;
import com.gigconnect.entities.Job;
import com.gigconnect.enums.BidStatus;
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
	public ApiResponse submitBid(Long freelancerId, BidRequest bid) 
{
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

	@Override
	public List<BidResponse> getMyBidByFreelancerId(Long freelancerId) 
	{
		//create empty list to collect all bids
		List<BidResponse> list=new ArrayList<>();
		
		//derived query to take list of bids by freelancer id 
		List<Bid> bidList=bidRepository.findByFreelancerId(freelancerId);
		
		for (Bid bid : bidList) {

		    BidResponse dto = new BidResponse();

		    dto.setBidId(bid.getId());
		    //fetch job details from job id
		    
		    dto.setJobId(bid.getJob().getId());
		    dto.setJobTitle(bid.getJob().getTitle());

		    dto.setAmount(bid.getAmount());
		    dto.setDuration(bid.getDurationDays());
		    dto.setProposal(bid.getProposal());
		    dto.setStatus(bid.getStatus());

		    list.add(dto);
		}
		if(list.isEmpty())
		{
		     throw new RuntimeException("List not Found");
		}
		return list ;
	}

	@Override
	public ApiResponse updateBid(Long bidId, UpdateBidRequest bid) {
		// TODO Auto-generated method stub
		      
		      //get bid by bid id 
		         
				Bid obj=bidRepository.findById(bidId)
						.orElseThrow(()-> new ResourceNotFoundException("Bid id invalid "));
				
				//check if status is pending ,if pending then only update bid 
				if (obj.getStatus() != BidStatus.PENDING) {
				    throw new ApiException("Only pending bids can be updated");
				}
				obj.setAmount(bid.getAmount());
				obj.setDurationDays(bid.getDuration());
				obj.setProposal(bid.getProposal());
			     
				//Save changes to database
				bidRepository.save(obj);
			
				return new ApiResponse("Successful","Bid  Updated SuccessFully");
	}
    
}
