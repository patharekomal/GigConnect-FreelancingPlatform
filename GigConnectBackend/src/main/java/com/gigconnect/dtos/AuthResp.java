package com.gigconnect.dtos;

import com.gigconnect.enums.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResp {
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private UserRole role;
	private String message;
}
