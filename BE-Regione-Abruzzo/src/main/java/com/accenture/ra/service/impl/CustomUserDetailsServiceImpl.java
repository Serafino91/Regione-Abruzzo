package com.accenture.ra.service.impl; // Adatta al tuo package di security

import com.accenture.ra.entity.User;
import com.accenture.ra.entity.Delegates;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.security.CustomUserDetails;
import com.accenture.ra.service.CustomUserDetailsService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService, CustomUserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String codiceFiscale) throws UsernameNotFoundException {
        User user = userRepository.findByFiscalCode(codiceFiscale)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato con Codice Fiscale: " + codiceFiscale));
        List<GrantedAuthority> authorities = new ArrayList<>();

        String primaryRole = (user.getRole() != null) ? user.getRole().name() : null;

// 2. Estrazione delle deleghe attive (stringhe)
        List<String> activeDelegates = new ArrayList<>();
        if (user.getDelegates() != null) {
            activeDelegates = user.getDelegates().stream()
                    .filter(Delegates::isActive)
                    .map(Delegates::getDelegateType)
                    .filter(Objects::nonNull)
                    .map(Enum::name)
                    .collect(Collectors.toList());
        }

// 3. Creazione delle GrantedAuthorities per Spring Security
        authorities = new ArrayList<>();
        if (primaryRole != null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + primaryRole));
        }
        for (String delegate : activeDelegates) {
            authorities.add(new SimpleGrantedAuthority("ROLE_DELEGATE_" + delegate));
        }

        return new CustomUserDetails(
                user.getFiscalCode(),
                user.getEmail(),
                primaryRole,
                activeDelegates,
                authorities
        );
    }
}