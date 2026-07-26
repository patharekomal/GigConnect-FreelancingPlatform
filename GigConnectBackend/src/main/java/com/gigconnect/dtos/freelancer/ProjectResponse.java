package com.gigconnect.dtos.freelancer;

import java.time.LocalDateTime;

import com.gigconnect.enums.ProjectStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectResponse {
	private Long projectId;

    private String jobTitle;

    private String jobDescription;

    private Long clientId;

    private Long freelancerId;

    private String freelancerName;

    private Double agreedAmount;

    private ProjectStatus status;

    private String submittedWork;

    private LocalDateTime createdAt;
}
