package com.accenture.ra.service;


import com.accenture.ra.dto.request.AccreditationRequest;
import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.response.AuthResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    UserResponse processAccreditation(AccreditationRequest request);
}