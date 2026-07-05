package com.gigconnect.service;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.client.JobRequestDto;

import jakarta.validation.Valid;

public interface JobService {

	ApiResponse postJob(Long clientId, JobRequestDto dto);

}
