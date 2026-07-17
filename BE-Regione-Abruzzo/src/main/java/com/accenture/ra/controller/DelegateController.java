package com.accenture.ra.controller;

import com.accenture.ra.security.Authority;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/delegates")
public class DelegateController {

    // Safely referencing Authority.Fields.PROJECT_CREATE
    @PostMapping("/projects")
    @PreAuthorize("hasAuthority(T(com.accenture.ra.security.Authority$Fields).PROJECT_CREATE)")
    public ResponseEntity<String> createProject() {
        return ResponseEntity.ok("Project successfully created!");
    }

    // Safely referencing Authority.Fields.REQUEST_CREATE
    @PostMapping("/requests")
    @PreAuthorize("hasAuthority(T(com.accenture.ra.security.Authority$Fields).REQUEST_CREATE)")
    public ResponseEntity<String> createRequest() {
        return ResponseEntity.ok("Request successfully created!");
    }

    // Safely referencing Authority.Fields.DATA_VIEW
    @GetMapping("/data")
    @PreAuthorize("hasAuthority(T(com.accenture.ra.security.Authority$Fields).DATA_VIEW)")
    public ResponseEntity<String> viewData() {
        return ResponseEntity.ok("Here is your delegated dashboard data.");
    }
}