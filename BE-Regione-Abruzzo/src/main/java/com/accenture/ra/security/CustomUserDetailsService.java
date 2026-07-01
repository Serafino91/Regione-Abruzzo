package com.accenture.ra.security; // Adatta al tuo package di security

import com.accenture.ra.entity.User;
import com.accenture.ra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String codiceFiscale) throws UsernameNotFoundException {
        // 1. Cerchiamo per Codice Fiscale anziché per username
        User user = userRepository.findByCodiceFiscale(codiceFiscale)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato con Codice Fiscale: " + codiceFiscale));

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        // 2. Ritorniamo lo UserDetails di Spring Security usando il CF e una password vuota
        return new org.springframework.security.core.userdetails.User(
                user.getCodiceFiscale(), // Username logico = Codice Fiscale
                "",                      // Password vuota (l'autenticazione è gestita a monte da SPID/JWT)
                authorities
        );
    }
}