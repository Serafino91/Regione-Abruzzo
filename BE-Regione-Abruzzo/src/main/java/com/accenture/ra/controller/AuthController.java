package com.accenture.ra.controller;

import com.accenture.ra.response.AuthResponse;
import com.accenture.ra.service.UserService;
import com.accenture.ra.request.AuthRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder; // Change the type from BCryptPasswordEncoder to PasswordEncoder

    @PostMapping("/generate-hash")
    public ResponseEntity<Map<String, String>> generateHash(@RequestBody Map<String, String> request) {
        String rawPassword = request.get("password");

        if (rawPassword == null || rawPassword.isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Password field cannot be empty");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Generate the new secure BCrypt hash
        String hashedPassword = passwordEncoder.encode(rawPassword);

        // Prepare the JSON response
        Map<String, String> response = new HashMap<>();
        response.put("rawPassword", rawPassword);
        response.put("bcryptHash", hashedPassword);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }
}
