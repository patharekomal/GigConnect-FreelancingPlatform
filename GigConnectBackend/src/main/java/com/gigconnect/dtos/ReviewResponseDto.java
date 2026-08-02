package com.gigconnect.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponseDto {

	private Long reviewId;

    private Integer rating;

    private String comment;

    private LocalDate reviewDate;

    private Long projectId;

    private String projectTitle;

    private Long freelancerId;

    private String freelancerName;
    
    private String clientName;

}