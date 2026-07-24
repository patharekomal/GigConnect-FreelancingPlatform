package com.gigconnect.dtos.client;

import java.time.LocalDate;

import com.gigconnect.enums.JobStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobResponseDto {
	private Long id;

    private String title;

    private String description;

    private Double budget;

    private JobStatus status;

    private LocalDate deadline;
    
    private Long clientId;
    private String companyName;
    
}
