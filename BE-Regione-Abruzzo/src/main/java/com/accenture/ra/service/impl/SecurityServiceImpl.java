package com.accenture.ra.service.impl;

import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.DelegateType;
import com.accenture.ra.security.CustomUserDetails;
import com.accenture.ra.service.SecurityService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component("securityService")
public class SecurityServiceImpl implements SecurityService {

    public boolean hasAccess(
            Authentication authentication,
            AccreditationStatus requiredStatus,
            DelegateType... allowedTypes) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CustomUserDetails user)) {
            return false;
        }

        // 1. Must be active
        if (!user.isActive()) {
            return false;
        }

        // 2. Must match the required AccreditationStatus
        if (user.getAccreditationStatus() != requiredStatus) {
            return false;
        }

        // 3. Must match one of the allowed DelegateTypes
        if (user.getDelegateType() == null) {
            return false;
        }

        return Arrays.asList(allowedTypes).contains(user.getDelegateType());
    }
}