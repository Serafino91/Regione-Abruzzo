package com.accenture.ra.service;

import java.util.Map;

public interface RaAuthService {
    /**
     * Interroga il gateway RAAuth per verificare la posizione dell'utente tramite Codice Fiscale.
     * @param codiceFiscale Il codice fiscale recuperato dallo SPID
     * @return Una mappa contenente i dati restituiti dalla Regione
     */
    Map<String, Object> verificaPosizione(String codiceFiscale);
}