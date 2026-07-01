package com.accenture.ra.service;

import com.accenture.ra.entity.Role;
import java.util.Set;

public interface JwtService {
    String generaTokenLocale(String codiceFiscale, String statoAccreditamento, Set<Role> roles);
}
