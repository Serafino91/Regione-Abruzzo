package com.accenture.ra.controller;

import com.accenture.ra.dto.request.AuthRequest;
import com.accenture.ra.dto.response.AuthResponse;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.entity.User;
import com.accenture.ra.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('DELEGATE_MASTER', 'DELEGATE_VIEWER', 'ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<List<UserResponse>> getUsers() {
        List<UserResponse> response = userService.getUsers();
        return ResponseEntity.ok(response);
    }
}
