package com.accenture.ra.service;

import java.util.Collection;

public interface JwtService {
    public String generaTokenLocale(String fiscalCode, String stato, Collection<String> roles);
}
