package com.gigconnect.dtos.freelancer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FreelancerResponse {
	
    private Long id;
    
    // Basic user details (coming from User table)
    private String firstName;
    private String lastName;
    private String email;
    
    //Freelancer Details 
    private String profession;
    private String skills;
    private float experience;
    private String portfolioLink;
    private String bio;
    private double hourlyRate;
    
    //Average Rating Given by Client 
    private float rating;

}
