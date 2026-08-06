package com.accenture.ra.service.impl;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegatedProjectsResponse;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.entity.DelegationEntity;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.UserEntity;
import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.DelegateType;
import com.accenture.ra.enums.DelegationStatus;
import com.accenture.ra.enums.RoleType;
import com.accenture.ra.mapper.DelegationMapper;
import com.accenture.ra.repository.DelegatesRepository;
import com.accenture.ra.repository.ProjectRepository;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.service.DelegationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DelegationServiceImpl implements DelegationService {

    private final DelegatesRepository delegatesRepository;
    private final DelegationMapper delegationMapper;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Override
    @Transactional
    public DelegationResponse createDelegation(CreateDelegationRequest request) {
        // 1. Get logged-in delegator from Spring Security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentFiscalCode = authentication.getName();

        UserEntity delegator = userRepository.findByFiscalCode(currentFiscalCode)
                .orElseThrow(() -> new IllegalArgumentException("Utente loggato non trovato con CF: " + currentFiscalCode));

        if (!delegator.isActive() || delegator.getAccreditationStatus() != AccreditationStatus.APPROVATO) {
            throw new IllegalStateException("L'utente delegante deve essere attivo e approvato per richiedere deleghe.");
        }

        // 2. Resolve Target User (Existing ID / CF lookup OR create pending user)
        UserEntity targetUserEntity = resolveOrCreateTargetUser(request);

        if (delegator.getId().equals(targetUserEntity.getId())) {
            throw new IllegalArgumentException("Non puoi delegare permessi a te stesso.");
        }

        // 3. Fetch Projects & Validate Authorization
        List<ProjectEntity> projects = Collections.emptyList();
        if (request.getProjectIds() != null && !request.getProjectIds().isEmpty()) {
            projects = projectRepository.findAllById(request.getProjectIds());
            if (projects.size() != request.getProjectIds().size()) {
                throw new IllegalArgumentException("Uno o più progetti specificati non esistono.");
            }

            for (ProjectEntity project : projects) {
                validateDelegationAuthority(delegator, project, request.getDelegateType());
            }
        }

        // 4. Map & Save Entity (Active flag set to false by Mapper)
        DelegationEntity delegation = delegationMapper.toEntity(request, targetUserEntity, delegator, projects);
        DelegationEntity saved = delegatesRepository.save(delegation);

        return delegationMapper.toResponse(saved);
    }

    /**
     * Called when the RA Ticket is approved and closed.
     */
    @Transactional
    public DelegationResponse approveAndActivateDelegation(Long delegationId) {
        DelegationEntity delegation = delegatesRepository.findById(delegationId)
                .orElseThrow(() -> new IllegalArgumentException("Delega non trovata con ID: " + delegationId));

        if (delegation.getStatus().equals(DelegationStatus.ATTIVA)) {
            throw new IllegalStateException("La delega è già attiva.");
        }

        // 1. Activate Target User if they were pending
        UserEntity targetUserEntity = delegation.getDelegatedUser();
        if (!targetUserEntity.isActive()) {
            targetUserEntity.setActive(true);
            targetUserEntity.setAccreditationStatus(AccreditationStatus.APPROVATO);
            userRepository.save(targetUserEntity);
        }

        // 2. Activate Delegation
        delegation.setStatus(DelegationStatus.ATTIVA);
        DelegationEntity updated = delegatesRepository.save(delegation);

        return delegationMapper.toResponse(updated);
    }

    private UserEntity resolveOrCreateTargetUser(CreateDelegationRequest request) {
        if (request.getDelegatedUser() != null) {
            return userRepository.findById(request.getDelegatedUser())
                    .orElseThrow(() -> new IllegalArgumentException("Target user non trovato con ID: " + request.getDelegatedUser()));
        }

        if (request.getFiscalCode() != null && !request.getFiscalCode().isBlank()) {
            String cf = request.getFiscalCode().toUpperCase();
            return userRepository.findByFiscalCode(cf)
                    .orElseGet(() -> createInactiveUser(cf, request.getEmail()));
        }

        throw new IllegalArgumentException("È necessario fornire targetUserId oppure fiscalCode.");
    }

    private UserEntity createInactiveUser(String fiscalCode, String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("L'email è obbligatoria per registrare un nuovo utente non presente a sistema.");
        }

        UserEntity newUserEntity = new UserEntity();
        newUserEntity.setFiscalCode(fiscalCode);
        newUserEntity.setEmail(email);
        newUserEntity.setFirstName("PENDING");
        newUserEntity.setLastName("PENDING");
        newUserEntity.setActive(false);
        newUserEntity.setAccreditationStatus(AccreditationStatus.IN_ATTESA);
        newUserEntity.setRole(RoleType.ROLE_USER);
        newUserEntity.setSignupDate(LocalDateTime.now());

        return userRepository.save(newUserEntity);
    }

    private void validateDelegationAuthority(UserEntity delegator, ProjectEntity project, DelegateType requestedDelegateType) {
        boolean isOwner = project.getCreatedBy().getId().equals(delegator.getId());
        if (isOwner) {
            return; // Project owner has full delegation power
        }

        DelegationEntity activeDelegation = delegatesRepository
                .findActiveDelegationByUserIdAndProjectId(delegator.getId(), project.getId())
                .orElseThrow(() -> new SecurityException(
                        "Non hai i permessi sul progetto ID: " + project.getId() + " per creare deleghe."
                ));

        DelegateType delegatorRole = activeDelegation.getDelegateType();

        if (delegatorRole == DelegateType.ROLE_DELEGATE_CREATOR) {
            throw new SecurityException("Gli utenti con ruolo CREATOR non possono creare deleghe.");
        }

        if (delegatorRole == DelegateType.ROLE_DELEGATE_VIEWER && requestedDelegateType != DelegateType.ROLE_DELEGATE_VIEWER) {
            throw new SecurityException("Un utente VIEWER può delegare solo il ruolo VIEWER.");
        }
    }

    public List<DelegationResponse> getDelegationsByDelegator() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String fiscalCode = authentication.getName();
        UserEntity delegator = userRepository.findByFiscalCode(fiscalCode)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato con CF: " + fiscalCode));

        List<DelegationEntity> delegations = delegatesRepository.findByDelegatedBy(delegator.getId());

        return delegationMapper.toResponseList(delegations);
    }
}