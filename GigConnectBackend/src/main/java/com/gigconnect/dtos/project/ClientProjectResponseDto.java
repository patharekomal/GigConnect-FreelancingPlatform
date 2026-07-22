package com.gigconnect.dtos.project;

import com.gigconnect.enums.ProjectStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientProjectResponseDto {
	
	//Project Details
	private Long projectId;
	private String projectTitle;
	private ProjectStatus status;
	private Double agreedAmount;
	private String description;
	
	//Freelancer Details
	private String freelancerName;
	
	//Submitted Work
    private String submittedWork;
}
