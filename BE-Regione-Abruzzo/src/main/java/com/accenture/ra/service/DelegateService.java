package com.accenture.ra.service;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.dto.request.AccreditationRequest;
import jakarta.validation.Valid;

import java.util.List;

public interface DelegateService {

    DelegationResponse createDelegation(@Valid CreateDelegationRequest request);

    // Ensure the parameter name and type match the implementation!
    UserResponse processAccreditation(AccreditationRequest request);

    List<DelegationResponse> getDelegationsByUserId(Long userId);
}