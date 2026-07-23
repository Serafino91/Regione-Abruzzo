package com.accenture.ra.service.impl;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.dto.request.AccreditationRequest;
import com.accenture.ra.entity.Delegates;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.User;
import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.RoleType;
import com.accenture.ra.mapper.DelegationMapper;
import com.accenture.ra.repository.DelegatesRepository;
import com.accenture.ra.repository.ProjectRepository;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.service.DelegateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DelegateServiceImpl implements DelegateService {

    private final DelegatesRepository delegatesRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final DelegationMapper delegationMapper;

    @Override
    @Transactional
    public DelegationResponse createDelegation(@Valid CreateDelegationRequest request) {
        // 1. Fetch & Validate Delegator
        User delegator = userRepository.findById(request.getDelegatorUserId())
                .orElseThrow(() -> new IllegalArgumentException("Delegator not found with ID: " + request.getDelegatorUserId()));

        if (!delegator.isActive() || delegator.getAccreditationStatus() != AccreditationStatus.APPROVATO) {
            throw new IllegalStateException("Delegator must be active and approved (APPROVATO) to issue delegations.");
        }

        // 2. Resolve Target User (Existing or New)
        User targetUser;
        if (request.getTargetUserId() != null) {
            targetUser = userRepository.findById(request.getTargetUserId())
                    .orElseThrow(() -> new IllegalArgumentException("Target user not found with ID: " + request.getTargetUserId()));
        } else if (request.getFiscalCode() != null && request.getEmail() != null) {
            targetUser = userRepository.findByFiscalCode(request.getFiscalCode())
                    .orElseGet(() -> createPendingUser(request.getFiscalCode(), request.getEmail()));
        } else {
            throw new IllegalArgumentException("Must provide either targetUserId or both fiscalCode and email.");
        }

        // 3. Fetch associated projects
        List<ProjectEntity> projectsToDelegate = Collections.emptyList();
        if (request.getProjectIds() != null && !request.getProjectIds().isEmpty()) {
            projectsToDelegate = projectRepository.findAllById(request.getProjectIds());
        }

        // 4. Construct Delegation Record
        Delegates delegation = new Delegates();
        delegation.setDelegateType(request.getDelegateType());
        delegation.setDelegationDate(LocalDateTime.now());
        delegation.setActive(targetUser.isActive() && targetUser.getAccreditationStatus() == AccreditationStatus.APPROVATO);
        delegation.setProjects(projectsToDelegate);

        // Maintain bidirectional memory state
        targetUser.getDelegates().add(delegation);
        delegation.setUser(targetUser);

        Delegates savedDelegation = delegatesRepository.save(delegation);
        return delegationMapper.toResponse(savedDelegation);
    }

    @Override
    @Transactional
    public UserResponse processAccreditation(AccreditationRequest request) {
        User user = userRepository.findByFiscalCode(request.getFiscalCode())
                .orElseThrow(() -> new IllegalArgumentException("User not found with Fiscal Code: " + request.getFiscalCode()));

        AccreditationStatus newStatus;
        try {
            newStatus = AccreditationStatus.valueOf(request.getAccreditationStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid accreditation status: " + request.getAccreditationStatus());
        }

        if (request.getRole() != null) {
            user.setRole(RoleType.valueOf(request.getRole().toUpperCase()));
        } else if (user.getRole() == null) {
            user.setRole(RoleType.ROLE_USER);
        }

        user.setAccreditationStatus(newStatus);
        boolean isApproved = (newStatus == AccreditationStatus.APPROVATO);
        user.setActive(isApproved);

        // Sync delegations status with user accreditation
        if (user.getDelegates() != null) {
            user.getDelegates().forEach(d -> d.setActive(isApproved));
        }

        User updatedUser = userRepository.save(user);
        return delegationMapper.toUserResponse(updatedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DelegationResponse> getDelegationsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        return delegationMapper.toResponseList(user.getDelegates());
    }

    private User createPendingUser(String fiscalCode, String email) {
        User newUser = new User();
        newUser.setFiscalCode(fiscalCode);
        newUser.setEmail(email);
        newUser.setRole(RoleType.ROLE_USER);
        newUser.setAccreditationStatus(AccreditationStatus.IN_ATTESA);
        newUser.setSignupDate(LocalDateTime.now());
        newUser.setActive(false);
        return userRepository.save(newUser);
    }
}