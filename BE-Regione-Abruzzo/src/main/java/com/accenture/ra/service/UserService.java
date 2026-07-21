package com.accenture.ra.service;


import com.accenture.ra.dto.request.AccreditationRequestDto;
import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.entity.User;
import com.accenture.ra.response.AuthResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {
    AuthResponse login(AuthRequest request);

    ResponseEntity userAccreditation(AccreditationRequestDto request);

    String userAccreditationStatus(String cf);
}