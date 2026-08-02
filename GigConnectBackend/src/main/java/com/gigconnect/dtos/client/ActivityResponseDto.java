package com.gigconnect.dtos.client;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityResponseDto {

    private String message;

    private LocalDateTime activityTime;
    
    private LocalDate activityDate;

}