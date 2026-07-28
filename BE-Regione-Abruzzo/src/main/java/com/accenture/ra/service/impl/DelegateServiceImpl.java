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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        // 1. Recupero del Codice Fiscale dell'utente loggato da Spring Security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentFiscalCode = authentication.getName();

        // 2. Fetch dell'Utente Delegante (Logged User) tramite Codice Fiscale
        User delegator = userRepository.findByFiscalCode(currentFiscalCode)
                .orElseThrow(() -> new IllegalArgumentException("Utente loggato non trovato con CF: " + currentFiscalCode));

        if (!delegator.isActive() || delegator.getAccreditationStatus() != AccreditationStatus.APPROVATO) {
            throw new IllegalStateException("L'utente delegante deve essere attivo e approvato per delegare.");
        }

        // 3. Fetch Target User
        User targetUser = userRepository.findById(request.getTargetUserId())
                .orElseThrow(() -> new IllegalArgumentException("Target user not found ID: " + request.getTargetUserId()));

        // 4. Fetch Projects
        List<ProjectEntity> projects = Collections.emptyList();
        if (request.getProjectIds() != null && !request.getProjectIds().isEmpty()) {
            projects = projectRepository.findAllById(request.getProjectIds());
        }

        // 5. Mappatura ed il salvataggio gestiti tramite MapStruct
        Delegates delegation = delegationMapper.toEntity(request, targetUser, delegator, projects);
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