package com.accenture.ra.controller;

import com.accenture.ra.dto.request.addUserForAppRequestDto;
import com.accenture.ra.service.AdfsTokenService;
import com.accenture.ra.service.RaAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add-user-no-admin")
    @PreAuthorize("hasAnyRole('STAFF')")
    public ResponseEntity<Map<String, Object>> addUserForAppNoAdmin(@RequestBody addUserForAppRequestDto request) {

        String token = adfsTokenService.getAdfsToken();

        Map<String, Object> response =
                raAuthService.getRolesForUser(token);



        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-user")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> addUserForApp(@RequestBody addUserForAppRequestDto request) {

        String token = adfsTokenService.getAdfsToken();

        Map<String, Object> response =
                raAuthService.getRolesForUser(token);



        return ResponseEntity.ok(response);
    }
}