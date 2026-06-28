package com.gigconnect.services;

import com.gigconnect.dtos.AuthDtos.*;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
