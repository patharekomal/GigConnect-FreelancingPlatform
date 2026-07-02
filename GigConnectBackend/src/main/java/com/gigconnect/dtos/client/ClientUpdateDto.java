package com.gigconnect.dtos.client;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientUpdateDto {

	@Size(min = 2, max = 30)
	private String firstName;

	@Size(min = 2, max = 30)
	private String lastName;

	@Pattern(regexp = "^[6-9]\\d{9}$",message = "Enter a valid 10-digit mobile number")
	private String phone;

    @Size(max = 100)
    private String companyName;

    @Size(max = 255)
    private String companyWebsite;

    @Size(max = 100)
    private String industry;

    @Size(max = 100)
    private String location;
}