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

        // 1. Primary Role Authority
        RoleType role = user.getRole();
        if (role != null) {
            authorities.add(new SimpleGrantedAuthority(role.getAuthority()));
        }

        // 2. Active DelegateType Authority
        DelegateType delegateType = extractActiveDelegateType(user);
        if (delegateType != null) {
            authorities.add(new SimpleGrantedAuthority(delegateType.name()));
        }

        // 3. Status attributes
        AccreditationStatus accreditationStatus = user.getAccreditationStatus();
        boolean isActive = user.isActive();

        return new CustomUserDetails(
                user.getFiscalCode(),
                user.getEmail(),
                authorities,
                accreditationStatus,
                delegateType,
                isActive
        );
    }

    private DelegateType extractActiveDelegateType(User user) {
        if (user.getDelegates() == null) {
            return null;
        }

        return user.getDelegates().stream()
                .filter(Delegates::isActive)
                .map(Delegates::getDelegateType)
                .filter(Objects::nonNull)
                .findFirst()
                .orElse(null);
    }
}