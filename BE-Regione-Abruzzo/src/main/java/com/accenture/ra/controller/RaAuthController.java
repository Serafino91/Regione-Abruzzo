package com.accenture.ra.controller;

import com.accenture.ra.service.AdfsTokenService;
import com.accenture.ra.service.RaAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ra")
public class RaAuthController {

    private final RaAuthService raAuthService;
    private final AdfsTokenService adfsTokenService;

    public RaAuthController(
            RaAuthService raAuthService,
            AdfsTokenService adfsTokenService) {

        this.raAuthService = raAuthService;
        this.adfsTokenService = adfsTokenService;
    }

    @GetMapping("/roles")
    public ResponseEntity<Map<String, Object>> roles() {

        String token = adfsTokenService.getAdfsToken();

        Map<String, Object> response =
                raAuthService.getRolesForUser(token);

        return ResponseEntity.ok(response);
    }
}