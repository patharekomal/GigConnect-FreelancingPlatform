package com.gigconnect.dtos.client;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientDashboardResponseDto {

    private Long jobsPosted;

    private Long activeProjects;

    private Double amountReleased;

    private List<ActivityResponseDto> recentActivities;

}