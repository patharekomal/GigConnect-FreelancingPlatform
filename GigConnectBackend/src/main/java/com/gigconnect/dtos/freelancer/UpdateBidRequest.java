package com.gigconnect.dtos.freelancer;
import com.gigconnect.enums.BidStatus;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBidRequest {

    @DecimalMin(value = "0.0", inclusive = false,message = "Amount must be greater than 0")
    private Double amount;

    @Min(value = 1, message = "Duration must be at least 1 day")
    private Integer duration;

    @Size(max = 1000, message = "Proposal should be within 1000 characters")
    private String proposal;
    
  
}