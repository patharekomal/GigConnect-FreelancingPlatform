package com.gigconnect.service;

import com.gigconnect.dtos.ApiResponse;
import com.gigconnect.dtos.AuthRequest;
import com.gigconnect.dtos.AuthResp;
import com.gigconnect.dtos.UserRegisterRequest;

import jakarta.validation.Valid;

public interface UserService {
	AuthResp authenticateUser(AuthRequest request);

	ApiResponse registerUser(UserRegisterRequest request);
}
