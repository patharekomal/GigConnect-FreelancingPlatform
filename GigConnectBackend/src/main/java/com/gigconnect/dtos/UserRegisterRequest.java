package com.gigconnect.dtos;

import java.time.LocalDate;

import com.gigconnect.enums.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRequest {
	
	//---------Common user details------------
	@NotBlank(message = "First name is required")
	private String firstName;
	
	@NotBlank(message = "Last name is required")
	private String lastName;
	
	 @NotBlank(message = "Email is required")
	    @Email(message = "Invalid email format")
	private String email;
	 
	 @NotBlank(message = "Password is required")
	 @Pattern(regexp="((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})",message="Invalid password format!!!")
	private String password;
	 
//	 @NotNull(message = "Date of birth is required")
//	private LocalDate dob;
	
	 @NotBlank(message = "Phone number is required")
	    @Pattern(
	        regexp = "^[6-9]\\d{9}$",
	        message = "Phone number must be a valid 10-digit Indian mobile number"
	    )
	private String phone;
	 
	 @NotNull(message = "Role is required") 
	private UserRole role;
	 
	 
	 //----------Client details---------------
	
	 	private String companyName;
	 	private String companyWebsite;
	    private String industry;
	    private String location;
	    
	  //-----------Freelancer Details-----------
	   
	    private String profession;
	    private String skills;
	    private Float experience;
	    private String portfolioLink;
	    private String bio;
	    private Double hourlyRate; 
	
}
