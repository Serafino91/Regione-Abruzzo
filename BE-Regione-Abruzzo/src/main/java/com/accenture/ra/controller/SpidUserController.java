package com.accenture.ra.controller;

import com.accenture.ra.response.SpidUserDto;
import com.accenture.ra.service.AdfsTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class SpidUserController {

    private final AdfsTokenService adfsTokenService;

    // Iniettiamo il servizio ADFS tramite costruttore
    public SpidUserController(AdfsTokenService adfsTokenService) {
        this.adfsTokenService = adfsTokenService;
    }

    @GetMapping("/user-info")
    public ResponseEntity<SpidUserDto> getAuthenticatedUser(@AuthenticationPrincipal OidcUser principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        String rawFiscalNumber = principal.getClaim("fiscalNumber");
        String cleanFiscalNumber = (rawFiscalNumber != null) ? rawFiscalNumber.replace("TINIT-", "") : null;

        SpidUserDto userDto = SpidUserDto.builder()
                .nome(principal.getClaim("givenName"))
                .cognome(principal.getClaim("familyName"))
                .email(principal.getEmail())
                .codiceFiscale(cleanFiscalNumber)
                .spidCode(principal.getClaim("spidCode"))
                .build();

        return ResponseEntity.ok(userDto);
    }

    // NEW: Endpoint temporaneo per verificare lo step 2 (In cascata)



    @GetMapping("/claims")
    public Map<String, Object> claims(
            @AuthenticationPrincipal OidcUser principal) {

        if (principal == null) {
            return Map.of("status", "NOT_AUTHENTICATED");
        }

        return principal.getClaims();
    }


}