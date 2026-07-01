package com.accenture.ra.service.impl;

import com.accenture.ra.service.RaTichetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.util.Map;

@Service
public class RaTichetServiceImpl implements RaTichetService {

    private static final Logger log = LoggerFactory.getLogger(RaTichetServiceImpl.class);
    private final RestClient restClient;

    public RaTichetServiceImpl(@Value("${regione.abruzzo.ratichet.url}") String apiUrl,
                               @Value("${regione.abruzzo.ratichet.token}") String apiToken) {
        this.restClient = RestClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader("Authorization", "Bearer " + apiToken)
                .build();
    }

    @Override
    @Async
    public void richiediAccreditamentoUtenza(String codiceFiscale, String email) {
        log.info("Chiamata HTTP reale verso RaTicheT (Inattiva perché coperta da @Primary) per CF: {}", codiceFiscale);
        try {
            restClient.post()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("cf", codiceFiscale, "email", email, "azione", "REQ_TICKET"))
                    .retrieve()
                    .toBodilessEntity();
        } catch (Exception e) {
            log.error("Errore di connessione", e);
        }
    }
}
