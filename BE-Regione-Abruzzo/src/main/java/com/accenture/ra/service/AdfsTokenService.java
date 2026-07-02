package com.accenture.ra.service;

public interface AdfsTokenService {
    /**
     * Recupera il Bearer Token M2M dall'ADFS della Regione Abruzzo.
     * @return Il token di accesso in formato String.
     */
    String getAdfsToken();
}