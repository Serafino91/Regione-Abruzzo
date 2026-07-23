package com.accenture.ra.service;


import com.accenture.ra.dto.request.AccreditationRequest;
import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.response.AuthResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {
    AuthResponse login(AuthRequest request);

    ResponseEntity userAccreditation(AccreditationRequest request);

    String userAccreditationStatus(String cf);
}