package com.accenture.ra.security; // Adatta al tuo package di security

import com.accenture.ra.entity.User;
import com.accenture.ra.entity.Delegates;
import com.accenture.ra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String codiceFiscale) throws UsernameNotFoundException {
        // 1. Cerchiamo per Codice Fiscale anziché per username
        User user = userRepository.findByFiscalCode(codiceFiscale)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato con Codice Fiscale: " + codiceFiscale));
        List<GrantedAuthority> authorities = new ArrayList<>();

// 1. Add primary role (if present)
        if (user.getRole() != null) {
            authorities.add(new SimpleGrantedAuthority(user.getRole().name()));
        }

// 2. Add active delegated roles (if present)
        if (user.getDelegates() != null) {
            user.getDelegates().stream()
                    .filter(Delegates::isActive) // optional: skip inactive delegations
                    .map(Delegates::getDelegateType)
                    .filter(Objects::nonNull)
                    .map(delegateType -> new SimpleGrantedAuthority(delegateType.name()))
                    .forEach(authorities::add);
        }

        // 2. Ritorniamo lo UserDetails di Spring Security usando il CF e una password vuota
        return new org.springframework.security.core.userdetails.User(
                user.getFiscalCode(), // Username logico = Codice Fiscale
                "",                      // Password vuota (l'autenticazione è gestita a monte da SPID/JWT)
                authorities
        );
    }
}