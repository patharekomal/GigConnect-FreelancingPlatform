package com.gigconnect.service;
import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.freelancer.FreelancerDashboardResponse;
import com.gigconnect.dtos.freelancer.FreelancerResponse;
import com.gigconnect.dtos.freelancer.UpdateFreelancerProfile;
public interface FreelancerService {

   FreelancerResponse	getFreelancerDetails(Long id);

   FreelancerResponse updateFreelancerDetails(Long id, UpdateFreelancerProfile req);
   FreelancerDashboardResponse getDashboard(Long freelancerId);
}
