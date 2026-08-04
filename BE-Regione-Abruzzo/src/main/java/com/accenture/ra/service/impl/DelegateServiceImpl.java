package com.accenture.ra.service.impl;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.response.DelegatedProjectsResponse;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.entity.Delegates;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.User;
import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.DelegateType;
import com.accenture.ra.enums.RoleType;
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

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DelegateServiceImpl implements DelegateService {

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

        User delegator = userRepository.findByFiscalCode(currentFiscalCode)
                .orElseThrow(() -> new IllegalArgumentException("Utente loggato non trovato con CF: " + currentFiscalCode));

        if (!delegator.isActive() || delegator.getAccreditationStatus() != AccreditationStatus.APPROVATO) {
            throw new IllegalStateException("L'utente delegante deve essere attivo e approvato per richiedere deleghe.");
        }

        // 2. Resolve Target User (Existing ID / CF lookup OR create pending user)
        User targetUser = resolveOrCreateTargetUser(request);

        if (delegator.getId().equals(targetUser.getId())) {
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
        Delegates delegation = delegationMapper.toEntity(request, targetUser, delegator, projects);
        Delegates saved = delegatesRepository.save(delegation);

        return delegationMapper.toResponse(saved);
    }

    /**
     * Called when the RA Ticket is approved and closed.
     */
    @Transactional
    public DelegationResponse approveAndActivateDelegation(Long delegationId) {
        Delegates delegation = delegatesRepository.findById(delegationId)
                .orElseThrow(() -> new IllegalArgumentException("Delega non trovata con ID: " + delegationId));

        if (delegation.isActive()) {
            throw new IllegalStateException("La delega è già attiva.");
        }

        // 1. Activate Target User if they were pending
        User targetUser = delegation.getUser();
        if (!targetUser.isActive()) {
            targetUser.setActive(true);
            targetUser.setAccreditationStatus(AccreditationStatus.APPROVATO);
            userRepository.save(targetUser);
        }

        // 2. Activate Delegation
        delegation.setActive(true);
        Delegates updated = delegatesRepository.save(delegation);

        return delegationMapper.toResponse(updated);
    }

    private User resolveOrCreateTargetUser(CreateDelegationRequest request) {
        if (request.getTargetUserId() != null) {
            return userRepository.findById(request.getTargetUserId())
                    .orElseThrow(() -> new IllegalArgumentException("Target user non trovato con ID: " + request.getTargetUserId()));
        }

        if (request.getFiscalCode() != null && !request.getFiscalCode().isBlank()) {
            String cf = request.getFiscalCode().toUpperCase();
            return userRepository.findByFiscalCode(cf)
                    .orElseGet(() -> createInactiveUser(cf, request.getEmail()));
        }

        throw new IllegalArgumentException("È necessario fornire targetUserId oppure fiscalCode.");
    }

    private User createInactiveUser(String fiscalCode, String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("L'email è obbligatoria per registrare un nuovo utente non presente a sistema.");
        }

        User newUser = new User();
        newUser.setFiscalCode(fiscalCode);
        newUser.setEmail(email);
        newUser.setFirstName("PENDING");
        newUser.setLastName("PENDING");
        newUser.setActive(false);
        newUser.setAccreditationStatus(AccreditationStatus.IN_ATTESA);
        newUser.setRole(RoleType.ROLE_USER);
        newUser.setSignupDate(LocalDateTime.now());

        return userRepository.save(newUser);
    }

    private void validateDelegationAuthority(User delegator, ProjectEntity project, DelegateType requestedDelegateType) {
        boolean isOwner = project.getCreatedBy().getId().equals(delegator.getId());
        if (isOwner) {
            return; // Project owner has full delegation power
        }

        Delegates activeDelegation = delegatesRepository
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

    @Override
    @Transactional(readOnly = true)
    public List<DelegationResponse> getDelegationsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato ID: " + userId));

        return delegationMapper.toResponseList(user.getDelegates());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DelegatedProjectsResponse> getDelegatedProjects(String fiscalCode, String activeRole) {
        DelegateType delegateType;
        try {
            String formattedRole = activeRole.startsWith("ROLE_") ? activeRole.toUpperCase() : "ROLE_" + activeRole.toUpperCase();
            delegateType = DelegateType.valueOf(formattedRole);
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new IllegalArgumentException("Ruolo attivo fornito non valido: " + activeRole);
        }

        List<Delegates> delegations = delegatesRepository.findActiveDelegationsByFiscalCodeAndRole(fiscalCode, delegateType);

        return delegationMapper.toDelegatedProjectsResponseList(delegations);
    }
}