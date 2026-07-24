package com.gigconnect.dtos.project;


import java.time.LocalDate;
import java.time.LocalDateTime;


import com.gigconnect.enums.ProjectStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDetailsResponse {

    // Project Details
    private Long projectId;
    private ProjectStatus status;
    private Double agreedAmount;
    private  LocalDateTime createdDate;

    // Job Details
    private Long jobId;
    private String title;
    private String description;
    private Double budget;
    private LocalDate  deadline;

    // Client Details
    private Long clientId;
    private String clientName;
    private String companyName;

    // Submitted Work
    private String submittedWork;
}