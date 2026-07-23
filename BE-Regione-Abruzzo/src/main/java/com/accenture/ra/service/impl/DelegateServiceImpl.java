package com.accenture.ra.service.impl;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.entity.Delegates;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.User;
import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.mapper.DelegationMapper;
import com.accenture.ra.repository.DelegatesRepository;
import com.accenture.ra.repository.ProjectRepository;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.service.DelegateService;
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
    public DelegationResponse createDelegation(CreateDelegationRequest request) {
        // 1. Fetch Delegator
        User delegator = userRepository.findById(request.getDelegatorUserId())
                .orElseThrow(() -> new IllegalArgumentException("Delegator not found ID: " + request.getDelegatorUserId()));

        if (!delegator.isActive() && delegator.getAccreditationStatus() != AccreditationStatus.APPROVATO) {
            throw new IllegalStateException("Delegator must be active and approved to issue delegations.");
        }

        // 2. Fetch Target User
        User targetUser = userRepository.findById(request.getTargetUserId())
                .orElseThrow(() -> new IllegalArgumentException("Target user not found ID: " + request.getTargetUserId()));

        // 3. Fetch Projects
        List<ProjectEntity> projects = Collections.emptyList();
        if (request.getProjectIds() != null && !request.getProjectIds().isEmpty()) {
            projects = projectRepository.findAllById(request.getProjectIds());
        }

        // 4. Create pure Delegation record
        Delegates delegation = new Delegates();
        delegation.setUser(targetUser);
        delegation.setDelegateType(request.getDelegateType());
        delegation.setDelegationDate(LocalDateTime.now());
        delegation.setActive(targetUser.isActive() && targetUser.getAccreditationStatus() == AccreditationStatus.APPROVATO);
        delegation.setProjects(projects);

        Delegates saved = delegatesRepository.save(delegation);
        return delegationMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DelegationResponse> getDelegationsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found ID: " + userId));

        return delegationMapper.toResponseList(user.getDelegates());
    }
}