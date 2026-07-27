package com.accenture.ra.controller;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.service.DelegateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delegations")
@RequiredArgsConstructor
public class DelegateController {

    private final DelegateService delegateService;


    @PostMapping("/delegate")
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_VIEWER')")
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
    public ResponseEntity<List<DelegationResponse>> getDelegationsByUserId(
            @PathVariable Long userId) {
        List<DelegationResponse> response = delegateService.getDelegationsByUserId(userId);
        return ResponseEntity.ok(response);

        }
}