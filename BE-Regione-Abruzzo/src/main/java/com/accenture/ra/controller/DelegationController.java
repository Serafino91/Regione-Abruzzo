package com.accenture.ra.controller;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegatedProjectsResponse;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.security.CustomUserDetails;
import com.accenture.ra.service.DelegationService;
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
public class DelegationController {

    private final DelegationService delegationService;


    @PostMapping("/delegate")
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_VIEWER', 'USER', 'ADMIN')")
    public ResponseEntity<DelegationResponse> createDelegation(
            @Valid @RequestBody CreateDelegationRequest request,
            @RequestHeader("x-active-role") String activeRole) {
        DelegationResponse response = delegationService.createDelegation(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Retrieve all delegations where the user is the delegator.
     * GET /delegations/user/getDelegationsByDelegator
     */
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'USER','ADMIN')")
    public ResponseEntity<List<DelegationResponse>> getDelegationsByDelegator(
            @RequestHeader("x-active-role") String activeRole) {

        List<DelegationResponse> response = delegationService.getDelegationsByDelegator();
        return ResponseEntity.ok(response);

    }
    /**
     * Approve delegations applying delegationStatus ATTIVO.
     * PATCH /delegations/approveDelegation
     */
    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<DelegationResponse> approveDelegation(@PathVariable("id") Long id) {
        DelegationResponse response = delegationService.approveAndActivateDelegation(id);
        return ResponseEntity.ok(response);
    }
}