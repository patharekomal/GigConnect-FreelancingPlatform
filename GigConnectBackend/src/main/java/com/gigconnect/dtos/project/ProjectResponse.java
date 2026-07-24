package com.gigconnect.dtos.project;

import com.gigconnect.enums.ProjectStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectResponse {

    //Primary key of project
    private Long projectId;

    //Job Details
    private Long jobId;
    private String jobTitle;

    //Client Details
    private Long clientId;
    private String clientName;
    private String companyName;
    //Project Amount
    private Double agreedAmount;

    //Current Status
    private ProjectStatus status;

}