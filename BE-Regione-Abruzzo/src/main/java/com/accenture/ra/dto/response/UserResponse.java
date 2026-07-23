package com.accenture.ra.dto.response;

import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.RoleType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserResponse {

    private Long id;
    private String fiscalCode;
    private String email;
    private AccreditationStatus accreditationStatus;
    private LocalDateTime signupDate;
    private RoleType role;
    private boolean active;
}