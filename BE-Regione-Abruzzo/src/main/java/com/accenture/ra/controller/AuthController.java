package com.accenture.ra.controller;

import com.accenture.ra.dto.request.AccreditationRequest;
import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.response.AuthResponse;
import com.accenture.ra.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/accreditation")
    public ResponseEntity<UserResponse> processAccreditation(@Valid @RequestBody AccreditationRequest request) {
        UserResponse response = authService.processAccreditation(request);
        return ResponseEntity.ok(response);
    }
}