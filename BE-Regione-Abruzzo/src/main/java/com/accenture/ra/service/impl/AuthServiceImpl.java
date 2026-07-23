package com.accenture.ra.service.impl;

import com.accenture.ra.dto.request.AccreditationRequest;
import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.entity.User;
import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.RoleType;
import com.accenture.ra.mapper.UserMapper;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.response.AuthResponse;
import com.accenture.ra.security.JwtUtils;
import com.accenture.ra.service.AuthService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final UserMapper userMapper;

    @Override
    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByFiscalCodeAndEmail(request.getFiscalCode(), request.getEmail())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Utente non trovato con Codice Fiscale: " + request.getFiscalCode() + " ed email: " + request.getEmail()
                ));

        String roleName = user.getRole() != null ? user.getRole().name() : "ROLE_USER";
        List<String> roles = List.of(roleName);

        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(roleName));
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getFiscalCode(),
                null,
                authorities
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.generateToken(user.getFiscalCode(), roles);

        return new AuthResponse(token, user.getFiscalCode(), roles);
    }

    @Override
    @Transactional
    public UserResponse processAccreditation(AccreditationRequest request) {
        User user = userRepository.findByFiscalCode(request.getFiscalCode())
                .orElseThrow(() -> new IllegalArgumentException("User not found with Fiscal Code: " + request.getFiscalCode()));

        user.setAccreditationStatus(request.getAccreditationStatus());

        User updatedUser = userRepository.save(user);
        return userMapper.toUserResponse(updatedUser);
    }
}