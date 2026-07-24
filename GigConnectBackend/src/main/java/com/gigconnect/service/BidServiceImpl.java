package com.gigconnect.service;

import java.time.LocalDateTime;
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
import com.gigconnect.entities.Project;
import com.gigconnect.enums.BidStatus;
import com.gigconnect.enums.JobStatus;
import com.gigconnect.enums.ProjectStatus;
import com.gigconnect.repository.BidRepository;
import com.gigconnect.repository.FreelancerRepository;
import com.gigconnect.repository.JobRepository;
import com.gigconnect.repository.ProjectRepository;

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
	private final ProjectRepository projectRepository;

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
		    dto.setBudget(bid.getJob().getBudget());

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

	
	@Override
	public ApiResponse deleteBid(Long bidId) {
		
		  Bid bid = bidRepository.findById(bidId)
		            .orElseThrow(() -> new RuntimeException("Bid not found"));

		  if (bid.getStatus() != BidStatus.PENDING) {
		        throw new RuntimeException("Only pending bids can be withdrawn.");
		    }

		    bidRepository.delete(bid);
			
			return new ApiResponse("Success","Bid Deleted Successfully");
		}
		
	
	@Override
	public List<BidResponse> getBidsByJob(Long jobId) {
		
		jobRepository.findById(jobId)
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Job not found with id : " + jobId));
		// Fetch bids
	    List<Bid> bidList = bidRepository.findByJobId(jobId);
	    
	    List<BidResponse> response = new ArrayList<>();
	    
	    for(Bid bid : bidList) {
	    	BidResponse dto = modelMapper.map(bid, BidResponse.class);
	    	
	    	dto.setBidId(bid.getId());
	    	
	    	dto.setFreelancerName(
	                bid.getFreelancer()
	                        .getUserDetails()
	                        .getFirstName()
	                        + " "
	                        + bid.getFreelancer()
	                        .getUserDetails()
	                        .getLastName());

	        response.add(dto);
	    }
	    
		return response;
	}

	@Override
	public ApiResponse acceptBid(Long bidId) {
		
		//Find selected bid
		Bid selectedBid = bidRepository.findById(bidId)
				.orElseThrow(()->new ResourceNotFoundException("Invalid Bid Id"));
		
		// Allow accepting only pending bids
	    if (selectedBid.getStatus() != BidStatus.PENDING) {
	        throw new ApiException("Bid is already processed.");
	    }
	    
	    //Accept selected bid
	    selectedBid.setStatus(BidStatus.ACCEPTED);
	    
	    //Get associated job
	    Job job = selectedBid.getJob();
	    
	    // Reject all other pending bids for this job
	    List<Bid> bidList = bidRepository.findByJobId(job.getId());

	    for (Bid bid : bidList) {

	        if (!bid.getId().equals(selectedBid.getId())
	                && bid.getStatus() == BidStatus.PENDING) {

	            bid.setStatus(BidStatus.REJECTED);
	        }
	    }
	    
	    // Close the job
	    job.setStatus(JobStatus.CLOSED);
	    
	    // Create Project
	    Project project = new Project();

	    project.setJob(job);

	    project.setClient(job.getClient());

	    project.setFreelancer(selectedBid.getFreelancer());
	    
	    //Agreed amount is the accepted bid amount
	    project.setAgreedAmount(selectedBid.getAmount());

	    project.setStatus(ProjectStatus.IN_PROGRESS);

	    //Nothing submitted yet
	    project.setSubmittedWork(null);

	    project.setCreatedAt(LocalDateTime.now());

	    projectRepository.save(project);

	    return new ApiResponse(
	            "Success",
	            "Bid accepted and Project created successfully");
	}

	@Override
	public BidResponse getBidByBidId(Long bidId) {
		// TODO Auto-generated method stub
		Bid obj=bidRepository.findById(bidId)
				.orElseThrow(()-> new ResourceNotFoundException("Bid id invalid "));
		BidResponse dto = modelMapper.map(obj, BidResponse.class);
		dto.setBidId(obj.getId());
		dto.setJobId(obj.getJob().getId());
		return dto;
	}
	
	
    
}
