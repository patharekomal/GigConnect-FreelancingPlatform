package com.gigconnect.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigconnect.dtos.client.JobRequestDto;
import com.gigconnect.dtos.client.JobResponseDto;
import com.gigconnect.dtos.client.JobUpdateDto;
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
	
	@GetMapping("/client/{clientId}")
    public ResponseEntity<?> getJobsByClient(
            @PathVariable Long clientId) {

        return ResponseEntity.ok(
                jobService.getJobsByClient(clientId));
    }
	
	@PatchMapping("/{jobId}")
	public ResponseEntity<?> updateJob(@PathVariable Long jobId,@RequestBody @Valid JobUpdateDto dto){
		return ResponseEntity.ok(jobService.updateJob(jobId,dto));
	}
	
	@DeleteMapping("/{jobId}")
	public ResponseEntity<?> deleteJob(@PathVariable Long jobId){
		return ResponseEntity.ok(
				jobService.deleteJob(jobId));
	}
	
	@GetMapping
	public ResponseEntity<List<JobResponseDto>> getAllJobs() {
	    return ResponseEntity.ok(jobService.getAllJobs());
	}
	
	
	@GetMapping("/{jobId}")
	public ResponseEntity<JobResponseDto> getJobById(@PathVariable Long jobId) {

	    return ResponseEntity.ok(jobService.getJobById(jobId));
	}
	
}
