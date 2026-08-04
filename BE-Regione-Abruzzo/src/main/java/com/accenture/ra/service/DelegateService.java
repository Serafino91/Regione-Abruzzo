package com.accenture.ra.service;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegatedProjectsResponse;
import com.accenture.ra.dto.response.DelegationResponse;
import jakarta.validation.Valid;

import java.util.List;

public interface DelegateService {

    DelegationResponse createDelegation(@Valid CreateDelegationRequest request);

    List<DelegationResponse> getDelegationsByUserId(Long userId);

    List<DelegatedProjectsResponse> getDelegatedProjects(String fiscalCode, String activeRole);

    DelegationResponse approveAndActivateDelegation(Long id);
}