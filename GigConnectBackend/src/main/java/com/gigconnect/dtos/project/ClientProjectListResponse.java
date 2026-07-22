package com.gigconnect.dtos.project;

import com.gigconnect.enums.ProjectStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientProjectListResponse {
	private Long projectId;

    private String projectTitle;

    private String freelancerName;

    private Double agreedAmount;

    private ProjectStatus status;
}
