package com.gigconnect.dtos.freelancer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FreelancerDashboardResponse {

    //Total bids submitted
    private Long totalBids;

    //Projects currently working on
    private Long activeProjects;

    //Projects submitted by freelancer
    private Long submittedProjects;

    //Completed projects
    private Long completedProjects;

    //Pending bids
    private Long pendingBids;

    //Average rating
    private float rating;

}