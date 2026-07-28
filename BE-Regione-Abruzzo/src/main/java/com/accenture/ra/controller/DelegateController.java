package com.accenture.ra.controller;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegatedProjectsResponse;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.entity.User;
import com.accenture.ra.security.CustomUserDetails;
import com.accenture.ra.service.DelegateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delegations")
@RequiredArgsConstructor
public class DelegateController {

    private final DelegateService delegateService;


    @PostMapping("/delegate")
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_VIEWER', 'USER', 'ADMIN')")
    public ResponseEntity<DelegationResponse> createDelegation(
            @Valid @RequestBody CreateDelegationRequest request) {
        DelegationResponse response = delegateService.createDelegation(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Retrieve all delegations assigned to a specific user by User ID.
     * GET /api/v1/delegations/user/{userId}
     */
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'USER','ADMIN')")
    public ResponseEntity<List<DelegationResponse>> getDelegationsByUserId(
            @PathVariable Long userId) {
        List<DelegationResponse> response = delegateService.getDelegationsByUserId(userId);
        return ResponseEntity.ok(response);

    }

    /**
     * Retrieve all project where the user is a delegate.
     * GET /delegations/user/getDelegatedProjects
     */
    @GetMapping("/user/getDelegatedProjects")
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'USER', 'ROLE_ADMIN', 'DELEGATE_CREATOR', 'DELEGATE_VIEWER')")
    public ResponseEntity<List<DelegatedProjectsResponse>> getDelegatedProjects(
            @RequestHeader("x-active-role") String activeRole,
            Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String fiscalCode = userDetails.getUsername();

        List<DelegatedProjectsResponse> response = delegateService.getDelegatedProjects(fiscalCode, activeRole);
        return ResponseEntity.ok(response);
    }
}