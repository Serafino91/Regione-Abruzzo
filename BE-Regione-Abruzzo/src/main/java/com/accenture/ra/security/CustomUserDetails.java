package com.accenture.ra.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails extends User {

    private final String fiscalCode;
    private final String email;
    private final String role;
    private final List<String> delegates;

    public CustomUserDetails(
            String fiscalCode,
            String email,
            String role,
            List<String> delegates,
            Collection<? extends GrantedAuthority> authorities
    ) {
        super(fiscalCode, "", authorities);
        this.fiscalCode = fiscalCode;
        this.email = email;
        this.role = role;
        this.delegates = delegates;
    }

    public String getFiscalCode() { return fiscalCode; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public List<String> getDelegates() { return delegates; }

    public boolean hasDelegate(String delegateType) {
        return delegates != null && delegates.contains(delegateType);
    }
}