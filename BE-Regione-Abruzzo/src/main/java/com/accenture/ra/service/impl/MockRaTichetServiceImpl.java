package com.accenture.ra.service.impl;

import com.accenture.ra.service.RaTichetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class MockRaTichetServiceImpl implements RaTichetService {

    private static final Logger log = LoggerFactory.getLogger(MockRaTichetServiceImpl.class);

    @Override
    public void richiediAccreditamentoUtenza(String codiceFiscale, String email) {
        log.info("[MOCK REGIONE ABRUZZO] Simulazione completata con successo.");
        log.info("[MOCK REGIONE ABRUZZO] Utente inviato a RaTicheT -> CF: {}, Email: {}", codiceFiscale, email);
    }
}
