package com.gigconnect.service;

import java.util.List;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.freelancer.FreelancerDashboardResponse;
import com.gigconnect.dtos.project.ProjectDetailsResponse;
import com.gigconnect.dtos.project.ProjectResponse;
import com.gigconnect.dtos.project.SubmitWorkRequest;

import jakarta.validation.Valid;

public interface ProjectService {

	//list all project by freelancerID
     List<ProjectResponse> getProjectsByFreelancer(Long freelancerId);
     
     ProjectDetailsResponse getProjectDetails(Long projectId);

	 ApiResponse submitWork(Long projectId, @Valid SubmitWorkRequest request);
	 
	

}
