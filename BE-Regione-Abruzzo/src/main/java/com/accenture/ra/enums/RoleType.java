package com.accenture.ra.enums;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

public enum RoleType implements GrantedAuthority {
    ROLE_ADMIN,
    ROLE_USER,
    ROLE_DEV;

    @Override
    public String getAuthority() {
        return name();
    }
}