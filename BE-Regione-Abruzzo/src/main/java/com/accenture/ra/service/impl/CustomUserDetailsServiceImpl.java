package com.accenture.ra.service.impl;

import com.accenture.ra.entity.Delegates;
import com.accenture.ra.entity.User;
import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.DelegateType;
import com.accenture.ra.enums.RoleType;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.security.CustomUserDetails;
import com.accenture.ra.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService, CustomUserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String codiceFiscale) throws UsernameNotFoundException {
        User user = userRepository.findByFiscalCode(codiceFiscale)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato con Codice Fiscale: " + codiceFiscale));

        List<GrantedAuthority> authorities = new ArrayList<>();

        // 1. Add Primary Role (e.g. ROLE_USER, ROLE_ADMIN)
        RoleType role = user.getRole();
        if (role != null) {
            authorities.add(new SimpleGrantedAuthority(role.getAuthority()));
        }

        // 2. Add ALL active delegation types into authorities pool
        List<DelegateType> activeDelegateTypes = extractAllActiveDelegateTypes(user);
        for (DelegateType delegateType : activeDelegateTypes) {
            authorities.add(new SimpleGrantedAuthority(delegateType.name()));
        }

        AccreditationStatus accreditationStatus = user.getAccreditationStatus();
        boolean isActive = user.isActive();
        DelegateType defaultDelegateType = activeDelegateTypes.isEmpty() ? null : activeDelegateTypes.get(0);

        return new CustomUserDetails(
                user.getFiscalCode(),
                user.getEmail(),
                authorities, // Contains primary role AND all active delegates
                accreditationStatus,
                defaultDelegateType,
                isActive
        );
    }

    private List<DelegateType> extractAllActiveDelegateTypes(User user) {
        if (user.getDelegates() == null) {
            return List.of();
        }

        return user.getDelegates().stream()
                .filter(Delegates::isActive)
                .map(Delegates::getDelegateType)
                .filter(Objects::nonNull)
                .toList();
    }
}