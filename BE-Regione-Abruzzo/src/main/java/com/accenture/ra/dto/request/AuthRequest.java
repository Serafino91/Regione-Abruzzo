package com.accenture.ra.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {
    @NotBlank
    private String fiscalCode;

    @NotBlank
    private String email;
}