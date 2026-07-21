package com.accenture.ra.service.impl;


import com.accenture.ra.dto.request.AccreditationRequestDto;
import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.entity.User;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.response.AuthResponse;
import com.accenture.ra.security.JwtUtils;
import com.accenture.ra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private UserRepository userRepository;

    @Override
    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        String token = jwtUtils.generateToken(username, roles);

        return new AuthResponse(token, username, roles);
    }

    @Override
    public ResponseEntity userAccreditation(AccreditationRequestDto request) {
       User userTobeAccred = userRepository.findByFiscalCode(request.getFiscalCode());

       userTobeAccred.setStatoAccreditamento(User.StatoAccreditamento.valueOf(request.getAccreditationStatus()));

       userRepository.save(userTobeAccred);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public String userAccreditationStatus(String CF) {

        String userAccrStatus = String.valueOf(userRepository.findByFiscalCode(CF).getStatoAccreditamento());

        return userAccrStatus;
    }


}