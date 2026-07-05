package com.gigconnect.service;

import java.util.List;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.client.JobRequestDto;
import com.gigconnect.dtos.client.JobResponseDto;

import jakarta.validation.Valid;

public interface JobService {

	ApiResponse postJob(Long clientId, JobRequestDto dto);

	List<JobResponseDto> getJobsByClient(Long clientId);

}
