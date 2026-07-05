package com.gigconnect.dtos.freelancer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BidRequest {

    private Long jobId;

    private double amount;

    private int duration;

    private String proposal;

}