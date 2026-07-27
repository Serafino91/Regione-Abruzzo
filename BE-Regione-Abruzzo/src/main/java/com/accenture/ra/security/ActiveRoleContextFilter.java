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

            if (!userDetails.isActive()) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Utente non attivo.");
                return;
            }

            // Extract all authorities loaded into CustomUserDetails
            Set<String> allowedAuthorities = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            String requestedRoleHeader = request.getHeader("X-Active-Role");
            String activeAuthority;

            if (requestedRoleHeader != null && !requestedRoleHeader.isBlank()) {
                // Validate that requested role is present in allowed authorities
                if (allowedAuthorities.contains(requestedRoleHeader)) {
                    activeAuthority = requestedRoleHeader;
                } else {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Ruolo attivo non autorizzato.");
                    return;
                }
            } else {
                // Fallback if no header is sent: Pick primary role or first available authority
                if (!allowedAuthorities.isEmpty()) {
                    activeAuthority = allowedAuthorities.iterator().next();
                } else {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Nessun ruolo attivo associato.");
                    return;
                }
            }

            // OVERWRITE SECURITY CONTEXT WITH EXACTLY ONE AUTHORITY
            List<GrantedAuthority> scopedAuthorities = List.of(new SimpleGrantedAuthority(activeAuthority));

            UsernamePasswordAuthenticationToken scopedAuth = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    auth.getCredentials(),
                    scopedAuthorities // <-- Scoped strictly to 1 authority
            );
            scopedAuth.setDetails(auth.getDetails());

            SecurityContextHolder.getContext().setAuthentication(scopedAuth);
        }

        filterChain.doFilter(request, response);
    }
}