package com.accenture.ra.controller;

import com.accenture.ra.service.RaAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ra")
public class RaAuthController {

    private final RaAuthService raAuthService;

    public RaAuthController(RaAuthService raAuthService) {
        this.raAuthService = raAuthService;
    }

    @GetMapping("/verifica-utente")
    public ResponseEntity<Map<String, Object>> verificaOperatoreInCascata(@AuthenticationPrincipal OidcUser principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        // 1. Estraiamo il codice fiscale dell'utente loggato con SPID
        String rawFiscalNumber = principal.getClaim("fiscalNumber");
        String cleanFiscalNumber = (rawFiscalNumber != null) ? rawFiscalNumber.replace("TINIT-", "") : "RSSMRA80A01H501U"; // Fallback se il mock SPID è vuoto

        // 2. Passiamo il CF al servizio che recupererà il token ADFS e interrogherà la Regione
        Map<String, Object> esitoRegione = raAuthService.verificaPosizione(cleanFiscalNumber);

        return ResponseEntity.ok(esitoRegione);
    }
}