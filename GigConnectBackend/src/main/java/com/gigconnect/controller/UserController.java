package com.gigconnect.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigconnect.dtos.AuthRequest;
import com.gigconnect.dtos.UserRegisterRequest;
import com.gigconnect.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	// dependency - constr based D.I
	private final UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegisterRequest request){
		System.out.println("in user registration " + request);
		return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerUser(request));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> userSignIn(@RequestBody @Valid AuthRequest request)
	{
		System.out.println("in user sign in "+request);
		
		//invoke service layer method
			return ResponseEntity.ok(userService.authenticateUser(request));
		
	}
	
	
	
	
}
