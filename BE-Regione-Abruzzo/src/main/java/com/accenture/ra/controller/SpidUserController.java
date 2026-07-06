package com.accenture.ra.controller;

import com.accenture.ra.response.SpidUserDto;
import com.accenture.ra.service.AdfsTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
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


    @GetMapping("/ping")
    public String ping() {
        return "OK";
    }


    // Mock che utilizza ms locali per simulare il flusso completo di autenticazione SPID -> ADFS -> RAAuth

    @PostMapping("/mock-callback")
    public ResponseEntity<?> mockCallback(
            @RequestBody Map<String, Object> claims) {

        RestTemplate restTemplate = new RestTemplate();


        // STEP 1 - SPID

        String cf = (String) claims.get("fiscalNumber");
        String nome = (String) claims.get("givenName");
        String cognome = (String) claims.get("familyName");
        String email = (String) claims.get("email");
        String spidCode = (String) claims.get("spidCode");

        if (!"TINIT-DGSGLC90A01B354X".equals(cf)) {
            return ResponseEntity.badRequest()
                    .body("CF SPID non valido");
        }

        if (!"Gianluca".equals(nome)) {
            return ResponseEntity.badRequest()
                    .body("Nome SPID non valido");
        }

        if (!"D'Agostino".equals(cognome)) {
            return ResponseEntity.badRequest()
                    .body("Cognome SPID non valido");
        }

        if (!"gianluca.dagostino@test.it".equals(email)) {
            return ResponseEntity.badRequest()
                    .body("Email SPID non valida");
        }

        if (!"12345678901011".equals(spidCode)) {
            return ResponseEntity.badRequest()
                    .body("SPID Code non valido");
        }


        // STEP 2 - ADFS


        Map<?, ?> adfsResponse =
                restTemplate.postForObject(
                        "http://localhost:9091/adfs/oauth2/token",
                        null,
                        Map.class);

        if (!"Bearer".equals(adfsResponse.get("token_type"))) {

            return ResponseEntity.status(401)
                    .body("Token type ADFS non valido");
        }

        String token =
                String.valueOf(adfsResponse.get("access_token"));

        if (token.isBlank()) {

            return ResponseEntity.status(401)
                    .body("Access token assente");
        }


        // STEP 3 - RAAUTH


        Map<?, ?> raauthResponse =
                restTemplate.postForObject(
                        "http://localhost:9092/data/searchUser",
                        null,
                        Map.class);

        String cfRaAuth =
                String.valueOf(raauthResponse.get("CF"));

        if (!"DGSGLC90A01B354X".equals(cfRaAuth)) {

            return ResponseEntity.status(403)
                    .body("CF RAAuth non valido");
        }

        if (!"Gianluca".equals(raauthResponse.get("nome"))) {

            return ResponseEntity.status(403)
                    .body("Nome RAAuth non valido");
        }

        if (!"D'Agostino".equals(raauthResponse.get("cognome"))) {

            return ResponseEntity.status(403)
                    .body("Cognome RAAuth non valido");
        }

        if (!Boolean.TRUE.equals(
                raauthResponse.get("abilitato"))) {

            return ResponseEntity.status(403)
                    .body("Utente non abilitato");
        }

        if (!Boolean.TRUE.equals(
                raauthResponse.get("spid"))) {

            return ResponseEntity.status(403)
                    .body("Utente non SPID");
        }


        // STEP 4 - RUOLI


        List<Map<String,Object>> ruoli =
                (List<Map<String,Object>>)
                        raauthResponse.get("ruoli");

        boolean admin = ruoli.stream()
                .anyMatch(r ->
                        "ADMIN".equals(r.get("label")));

        boolean extAuth = ruoli.stream()
                .anyMatch(r ->
                        "EXT_AUTH".equals(r.get("label")));

        if (!admin) {
            return ResponseEntity.status(403)
                    .body("Ruolo ADMIN mancante");
        }

        if (!extAuth) {
            return ResponseEntity.status(403)
                    .body("Ruolo EXT_AUTH mancante");
        }


        // SUCCESSO


        return ResponseEntity.ok(
                Map.of(
                        "authenticated", true,
                        "codiceFiscale", cfRaAuth,
                        "tokenType", adfsResponse.get("token_type"),
                        "tokenPresent", true,
                        "ruoli", ruoli,
                        "utentePresente", true,
                        "abilitato", true
                )
        );
    }
}