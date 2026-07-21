package com.accenture.ra.service;

import com.accenture.ra.entity.Role;

import java.util.Collection;
import java.util.Set;

public interface JwtService {
    public String generaTokenLocale(String fiscalCode, String stato, Collection<String> roles);
}
