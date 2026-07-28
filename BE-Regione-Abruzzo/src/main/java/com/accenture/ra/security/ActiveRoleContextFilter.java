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

            // 1. Verifica presenza obbligatoria dell'header X-Active-Role
            String requestedRoleHeader = request.getHeader("X-Active-Role");
            if (requestedRoleHeader == null || requestedRoleHeader.isBlank()) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Header 'X-Active-Role' obbligatorio.");
                return;
            }

            // 2. Estrazione delle autorità consentite per l'utente
            Set<String> allowedAuthorities = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            // 3. Normalizzazione e Validazione del ruolo richiesto (con o senza prefisso ROLE_)
            String activeAuthority;
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

            // 4. Aggiornamento del SecurityContext con l'unica autorità attiva selezionata
            List<GrantedAuthority> scopedAuthorities = List.of(new SimpleGrantedAuthority(activeAuthority));

            UsernamePasswordAuthenticationToken scopedAuth = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    auth.getCredentials(),
                    scopedAuthorities
            );
            scopedAuth.setDetails(auth.getDetails());

            SecurityContextHolder.getContext().setAuthentication(scopedAuth);
        }

        filterChain.doFilter(request, response);
    }
}