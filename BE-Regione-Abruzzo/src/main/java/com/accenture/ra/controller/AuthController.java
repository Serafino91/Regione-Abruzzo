package com.accenture.ra.controller;

import com.accenture.ra.dto.response.AuthenticatedUserDto;
import com.accenture.ra.service.AdfsTokenService;
import com.accenture.ra.service.RaAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AdfsTokenService adfsTokenService;

    private final RaAuthService raAuthService;

    public AuthController(AdfsTokenService adfsTokenService, RaAuthService raAuthService) {
        this.adfsTokenService = adfsTokenService;
        this.raAuthService = raAuthService;
    }

    @GetMapping("/user-info")
    public ResponseEntity<AuthenticatedUserDto> getAuthenticatedUser(
            @AuthenticationPrincipal OidcUser principal) {

        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(
                AuthenticatedUserDto.builder()
                        .subject(principal.getSubject())
                        .email(principal.getEmail())
                        .name(principal.getName())
                        .claims(principal.getClaims())
                        .build()
        );
    }

    @GetMapping("/claims")
    public ResponseEntity<?> claims(
            @AuthenticationPrincipal OidcUser principal) {

        if (principal == null) {
            return ResponseEntity.status(401)
                    .body("NOT_AUTHENTICATED");
        }

        return ResponseEntity.ok(principal.getClaims());
    }



    @GetMapping("/roles")
    public ResponseEntity<?> roles() {

        String accessToken = adfsTokenService.getAdfsToken();

        return ResponseEntity.ok(
                raAuthService.getRolesForUser(accessToken)
        );
    }


}