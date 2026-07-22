package com.gigconnect.dtos;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponseDto {

    private Long reviewId;

    private String clientName;

    private Integer rating;

    private String comment;

    private LocalDate reviewDate;

}