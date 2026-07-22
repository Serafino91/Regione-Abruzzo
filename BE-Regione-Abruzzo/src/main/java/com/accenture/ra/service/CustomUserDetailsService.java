package com.accenture.ra.service;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface CustomUserDetailsService extends UserDetailsService {

    // Eredita già il metodo loadUserByUsername(String username) da UserDetailsService

}