package com.gigconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigconnect.dtos.ai.JobAIResponseDto;
import com.gigconnect.dtos.client.JobResponseDto;
import com.gigconnect.dtos.freelancer.FreelancerAIResponseDto;
import com.gigconnect.service.FreelancerService;
import com.gigconnect.service.JobService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AIController {

    private final JobService jobService;
    private final FreelancerService freelancerService;

    @GetMapping("/jobs")
    public ResponseEntity<List<JobResponseDto>> getJobsForAI() {

        return ResponseEntity.ok(jobService.getAllJobs());

    }
    
    @GetMapping("/freelancer/{userId}")
    public ResponseEntity<FreelancerAIResponseDto>
    getFreelancerForAI(@PathVariable Long userId){

        return ResponseEntity.ok(
            freelancerService.getFreelancerForAI(userId)
        );

    }
    
    @GetMapping("/job/{jobId}")
    public ResponseEntity<JobAIResponseDto>
    getJobForAI(@PathVariable Long jobId){

        return ResponseEntity.ok(
                jobService.getJobForAI(jobId)
        );

    }
}
