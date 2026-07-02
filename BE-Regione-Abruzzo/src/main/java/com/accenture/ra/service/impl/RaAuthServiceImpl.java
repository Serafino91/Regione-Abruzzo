package com.accenture.ra.service.impl;

import com.accenture.ra.service.AdfsTokenService;
import com.accenture.ra.service.RaAuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class RaAuthServiceImpl implements RaAuthService {

    private final RestClient restClient;
    private final AdfsTokenService adfsTokenService;

    @Value("${ra.auth.get-data-url:}")
    private String getDataUrl;

    @Value("${ra.auth.app-code:}")
    private String appCode;

    @Value("${ra.ticket.service-url:}")
    private String ticketServiceUrl;

    @Value("${ra.ticket.new-ticket-path:}")
    private String newTicketPath;

    public RaAuthServiceImpl(RestClient.Builder restClientBuilder,
                             AdfsTokenService adfsTokenService) {
        this.restClient = restClientBuilder.build();
        this.adfsTokenService = adfsTokenService;
    }

    @Override
    public Map<String, Object> verificaPosizione(String codiceFiscale) {
        if (getDataUrl == null || getDataUrl.isBlank()) {
            return getMockRaAuthResponse(codiceFiscale);
        }

        String tokenAdfs = adfsTokenService.getAdfsToken();

        Map<String, Object> ticket = new HashMap<>();
        ticket.put("hostName", codiceFiscale);
        ticket.put("dataTicket", OffsetDateTime.now().toString());
        ticket.put("message", "<p>Richiesta verifica/accreditamento utente con CF: " + codiceFiscale + "</p>");
        ticket.put("allegati", java.util.List.of());

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ticket", ticket);

        Map<String, Object> payload = new HashMap<>();
        payload.put("appCode", appCode);
        payload.put("service", ticketServiceUrl);
        payload.put("path", newTicketPath);
        payload.put("method", "POST");
        payload.put("parameters", parameters);

        try {
            return restClient.post()
                    .uri(getDataUrl)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenAdfs)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .body(Map.class);

        } catch (Exception e) {
            System.out.println("Connessione RAAuth fallita. Uso mock. Dettaglio: " + e.getMessage());
            return getMockRaAuthResponse(codiceFiscale);
        }
    }

    private Map<String, Object> getMockRaAuthResponse(String codiceFiscale) {
        Map<String, Object> mockResponse = new HashMap<>();
        mockResponse.put("codiceFiscaleVerificato", codiceFiscale);
        mockResponse.put("statoAutorizzativo", "ATTIVO");
        mockResponse.put("profiloRA", "OPERATORE_BACKOFFICE");
        mockResponse.put("codiceEsito", "00");
        mockResponse.put("descrizioneEsito", "Mock RAAuth sviluppo locale");
        return mockResponse;
    }
}