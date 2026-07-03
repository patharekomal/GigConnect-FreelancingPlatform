package com.gigconnect.dtos.freelancer;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateFreelancerProfile {

    @Size(max = 100, message = "Should be less than 100 characters")
    private String profession;

    @Size(max = 200, message = "Skills Should be less than 200 characters")
    private String skills;

    
    @Min(value = 0, message = "Experience cannot be negative")
    private float experience;

     
    private String portfolioLink;//GitHub / LinkedIn link

    
    @Size(max = 500, message = "Bio Should be less than 500 characters")
    private String bio;

    @DecimalMin(value = "0.0", inclusive = false, message = "Should Be greater than 0")
    private double hourlyRate;
}
