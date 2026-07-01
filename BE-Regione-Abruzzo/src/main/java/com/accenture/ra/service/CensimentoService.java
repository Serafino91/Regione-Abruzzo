package com.accenture.ra.service;

import java.util.Map;

public interface CensimentoService {
    Map<String, String> eseguiCensimentoEAutenticazione(Map<String, Object> userInfoClaims);
}