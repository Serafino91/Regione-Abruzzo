package com.accenture.ra.service;


import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.response.AuthResponse;

public interface UserService {
    AuthResponse login(AuthRequest request);
}