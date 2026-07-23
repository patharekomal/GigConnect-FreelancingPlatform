package com.gigconnect.dtos.freelancer;

import com.gigconnect.enums.BidStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidResponse {


	 // Bid Details
    private Long bidId;

    private Double amount;

    private Integer duration;

    private String proposal;

    private BidStatus status;
    
    //job title which need for mybid jobs
    private Long jobId;

    private String jobTitle;
    
    private Double budget;
    
    // null if bid is not accepted
    private Long projectId;
    
    private String freelancerName;
    

}