package com.accenture.ra.controller;

import com.accenture.ra.service.CensimentoService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class MockOidcController {

    private final CensimentoService censimentoService;

    public MockOidcController(CensimentoService censimentoService) {
        this.censimentoService = censimentoService;
    }

    /**
     * Endpoint di test in localhost per testare il flusso end-to-end senza infrastrutture esterne.
     * URI: http://localhost:8080/api/test/mock-spid-login?cf=TINIT-RSSMRA80A01H501U&email=mario@abruzzo.it
     */
    @GetMapping("/api/test/mock-spid-login")
    public ResponseEntity<Map<String, String>> mockSpidLogin(
            @RequestParam(defaultValue = "TINIT-RSSMRA80A01H501U") String cf,
            @RequestParam(defaultValue = "mario.rossi@example.com") String email) {

        // Impacchettiamo l'input simulando la struttura mappa dei claims OIDC
        Map<String, Object> mockClaims = Map.of("fiscal_number", cf, "email", email);

        // Delega totale dello switch logico e del processing al service impl
        Map<String, String> authResponse = censimentoService.eseguiCensimentoEAutenticazione(mockClaims);

        return ResponseEntity.ok(authResponse);
    }
}