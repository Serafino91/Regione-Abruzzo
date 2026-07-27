package com.accenture.ra.security;

import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.DelegateType;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class CustomUserDetails extends User {

    private final String email;
    private final AccreditationStatus accreditationStatus;
    private final DelegateType delegateType;
    private final boolean active;

    public CustomUserDetails(
            String fiscalCode,
            String email,
            Collection<? extends GrantedAuthority> authorities,
            AccreditationStatus accreditationStatus,
            DelegateType delegateType,
            boolean active) {
        // Pass dummy empty string for password field expected by Spring Security
        super(fiscalCode, "", authorities);
        this.email = email;
        this.accreditationStatus = accreditationStatus;
        this.delegateType = delegateType;
        this.active = active;
    }
}