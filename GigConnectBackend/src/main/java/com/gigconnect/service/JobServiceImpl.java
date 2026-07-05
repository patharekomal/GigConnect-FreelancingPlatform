package com.gigconnect.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.gigconnect.custom_exceptions.ResourceNotFoundException;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.client.JobRequestDto;
import com.gigconnect.entities.Client;
import com.gigconnect.entities.Job;
import com.gigconnect.enums.JobStatus;
import com.gigconnect.repository.ClientRepository;
import com.gigconnect.repository.JobRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{

	private final JobRepository jobRepo;
	private final ClientRepository clientRepo;
	private final ModelMapper mapper;
	
	@Override
	public ApiResponse postJob(Long clientId, @Valid JobRequestDto dto) {
		
		//fetch client
		Client client = clientRepo.findById(clientId)
				.orElseThrow(()->new ResourceNotFoundException("Client not found"));
		
		//Create job
		Job job = mapper.map(dto, Job.class);
		
		//Default Status is OPEN
		job.setStatus(JobStatus.OPEN);
		
		//Associate Client
		job.setClient(client);

		jobRepo.save(job);
		
		
		return new ApiResponse("Success",
	            "Job posted successfully");
	}

}
