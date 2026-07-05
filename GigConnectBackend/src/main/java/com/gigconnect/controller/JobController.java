package com.gigconnect.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigconnect.dtos.client.JobRequestDto;
import com.gigconnect.service.JobService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {
	
	private final JobService jobService;
	
	@PostMapping("/{clientId}")
	public ResponseEntity<?> postJob(@PathVariable Long clientId,@RequestBody @Valid JobRequestDto dto){
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(jobService.postJob(clientId, dto));
	}
}
