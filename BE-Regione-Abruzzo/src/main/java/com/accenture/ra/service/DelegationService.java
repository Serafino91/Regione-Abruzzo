package com.accenture.ra.service;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegatedProjectsResponse;
import com.accenture.ra.dto.response.DelegationResponse;
import jakarta.validation.Valid;

import java.util.List;

public interface DelegationService {

    DelegationResponse createDelegation(@Valid CreateDelegationRequest request);

    DelegationResponse approveAndActivateDelegation(Long id);

    List<DelegationResponse> getDelegationsByDelegator();
}