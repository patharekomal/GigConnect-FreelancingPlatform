package com.gigconnect.dtos.client;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientResponse {
	// Basic user details (coming from User table)
    private String firstName;
    private String lastName;
    private String email;
    
    //Client details
    private String companyName;
	private String industry;
	private String location;
}
