package com.accenture.ra.service.impl;

import com.accenture.ra.dto.request.AccreditationRequest;
import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.entity.User;
import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.response.AuthResponse;
import com.accenture.ra.security.JwtUtils;
import com.accenture.ra.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    @Override
    public AuthResponse login(AuthRequest request) {
        // 1. Find user by Fiscal Code & Email
        User user = userRepository.findByFiscalCodeAndEmail(request.getFiscalCode(), request.getEmail())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Utente non trovato con Codice Fiscale: " + request.getFiscalCode() + " ed email: " + request.getEmail()
                ));

        // 2. Extract role from enum and format for Spring Security / JWT
        String roleName = user.getRole() != null ? user.getRole().name() : "ROLE_USER";
        List<String> roles = List.of(roleName);

        // 3. Register user in Spring Security Context
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(roleName));
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getFiscalCode(),
                null,
                authorities
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 4. Generate token and return response
        String token = jwtUtils.generateToken(user.getFiscalCode(), roles);

        return new AuthResponse(token, user.getFiscalCode(), roles);
    }

    @Override
    public ResponseEntity<Void> userAccreditation(AccreditationRequest request) {
        User user = userRepository.findByFiscalCode(request.getFiscalCode())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Utente non trovato con Codice Fiscale: " + request.getFiscalCode()
                ));

        AccreditationStatus nuovoStato = AccreditationStatus.valueOf(request.getAccreditationStatus().toUpperCase());
        user.setAccreditationStatus(nuovoStato);
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    @Override
    public String userAccreditationStatus(String CF) {
        User user = userRepository.findByFiscalCode(CF)
                .orElseThrow(() -> new EntityNotFoundException("Utente non trovato con Codice Fiscale: " + CF));

        return String.valueOf(user.getAccreditationStatus());
    }
}