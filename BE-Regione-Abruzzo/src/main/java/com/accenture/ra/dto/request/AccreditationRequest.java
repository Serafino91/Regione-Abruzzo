package com.accenture.ra.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccreditationRequest {

    @NotNull(message = "Fiscal code is required")
    private String fiscalCode;

    @NotNull(message = "Accreditation status is required")
    private String accreditationStatus;

    // Default role assignment if creating/updating user system role (e.g., ROLE_USER)
    private String role;
}