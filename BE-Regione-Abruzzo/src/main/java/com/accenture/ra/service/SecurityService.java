package com.accenture.ra.service;

import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.enums.DelegateType;
import org.springframework.security.core.Authentication;

public interface SecurityService {

    /**
     * Evaluates whether the authenticated user meets the active status,
     * required AccreditationStatus, and allowed DelegateTypes.
     */
    boolean hasAccess(
            Authentication authentication,
            AccreditationStatus requiredStatus,
            DelegateType... allowedTypes
    );
}