package com.accenture.ra.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ActiveRoleContextFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof CustomUserDetails userDetails) {

            // 1. Check if user is active
            if (!userDetails.isActive()) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Utente non attivo.");
                return;
            }

            // 2. Extract allowed authorities for the user
            Set<String> allowedAuthorities = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            String requestedRoleHeader = request.getHeader("X-Active-Role");
            String activeAuthority = null;

            // 3. Fallback logic: if header is missing, default to the user's first authority
            if (requestedRoleHeader == null || requestedRoleHeader.isBlank()) {
                activeAuthority = allowedAuthorities.stream().findFirst().orElse(null);
            } else {
                // Validate requested role with or without "ROLE_" prefix
                String formattedWithPrefix = requestedRoleHeader.startsWith("ROLE_")
                        ? requestedRoleHeader
                        : "ROLE_" + requestedRoleHeader;

                if (allowedAuthorities.contains(requestedRoleHeader)) {
                    activeAuthority = requestedRoleHeader;
                } else if (allowedAuthorities.contains(formattedWithPrefix)) {
                    activeAuthority = formattedWithPrefix;
                } else {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Ruolo attivo non autorizzato per questo utente.");
                    return;
                }
            }

            // 4. Update SecurityContext with the active scoped authority
            if (activeAuthority != null) {
                List<GrantedAuthority> scopedAuthorities = List.of(new SimpleGrantedAuthority(activeAuthority));

                UsernamePasswordAuthenticationToken scopedAuth = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        auth.getCredentials(),
                        scopedAuthorities
                );
                scopedAuth.setDetails(auth.getDetails());

                SecurityContextHolder.getContext().setAuthentication(scopedAuth);
            }
        }

        filterChain.doFilter(request, response);
    }
}