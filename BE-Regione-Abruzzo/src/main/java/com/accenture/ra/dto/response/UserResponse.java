package com.accenture.ra.dto.response;

import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.RoleType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String fiscalCode;
    private String firstName;
    private String lastName;
    private String email;
    private String pec;
    private String vatNumber;
    private String companyRole;
    private AccreditationStatus accreditationStatus;
    private LocalDateTime signupDate;
    private RoleType role;
    private List<DelegationResponse> delegates;
    private boolean active;
}