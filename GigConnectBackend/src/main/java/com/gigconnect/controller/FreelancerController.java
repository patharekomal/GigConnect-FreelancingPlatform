package com.gigconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gigconnect.dtos.freelancer.FreelancerResponse;
import com.gigconnect.service.FreelancerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/freelancers")
@RequiredArgsConstructor
public class FreelancerController {
     
	//COnsttructor based DI
	private final FreelancerService freelancerService;
	
	/*
	 * Method-GET
	 * URL:http:/localhost:8080/freelancers/1
	 * Input-ID
	 * Output- FREELANCER Info 
	 */
	
	@GetMapping("/{id}")
	public ResponseEntity<FreelancerResponse> getFreelancerDetails(@PathVariable Long id)
	{
		return ResponseEntity.ok(freelancerService.getFreelancerDetails(id));
	}
}
