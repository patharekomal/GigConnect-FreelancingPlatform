package com.gigconnect.dtos.freelancer;

import com.gigconnect.enums.BidStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidResponse {

    private Long bidId;

    private String jobTitle;

    private double amount;

    private int duration;

    private String proposal;

    private BidStatus status;

}