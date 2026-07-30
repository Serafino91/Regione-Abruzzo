package com.accenture.ra.controller;

import com.accenture.ra.dto.request.AccreditationRequest;
import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.dto.response.DelegatedProjectsResponse;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.dto.response.AuthResponse;
import com.accenture.ra.security.CustomUserDetails;
import com.accenture.ra.service.AuthService;
import com.accenture.ra.service.impl.CustomUserDetailsServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final CustomUserDetailsServiceImpl customUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("user/accreditation")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<UserResponse> processAccreditation(@Valid @RequestBody AccreditationRequest request) {
        UserResponse response = authService.processAccreditation(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Retrieve all Roles, including delegations.
     * GET /delegations/user/getDelegatedProjects
     */
    @GetMapping("/user/get-roles")
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'ROLE_USER', 'ROLE_ADMIN', 'DELEGATE_CREATOR', 'DELEGATE_VIEWER')")
    public ResponseEntity<UserDetails> getRoles(
            @RequestHeader("x-active-role") String activeRole,
            Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String fiscalCode = userDetails.getUsername();

        UserDetails response = customUserDetailsService.loadUserByUsername(fiscalCode);
        return ResponseEntity.ok(response);
    }
}