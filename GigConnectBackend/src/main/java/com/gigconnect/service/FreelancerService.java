package com.gigconnect.service;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.freelancer.FreelancerResponse;
public interface FreelancerService {

   FreelancerResponse	getFreelancerDetails(Long id);

}
