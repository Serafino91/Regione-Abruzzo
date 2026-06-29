package com.accenture.ra.client;

import com.accenture.ra.config.RaTicketProperties;
import com.accenture.ra.entity.Ticket;
import com.accenture.ra.model.TicketPayload;
import com.accenture.ra.model.GatewayRequest; // <-- ADD THIS IMPORT LINE
import com.accenture.ra.repository.TicketRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import java.util.Map;

@Component
public class RaTicketClient {

    private final RestClient restClient;
    private final RaTicketProperties config;

    // Spring Boot automatically injects the RestClient Builder and your application.properties configs
    public RaTicketClient(RestClient.Builder restClientBuilder, RaTicketProperties config) {
        this.config = config;
        this.restClient = restClientBuilder.baseUrl(config.gatewayUrl()).build();
    }

    /**
     * POST Intermediary: Forwards the creation payload to the proxy gateway
     */
    public String createTicket(TicketPayload ticket) {
        GatewayRequest requestPayload = new GatewayRequest(
                config.appCode(),
                config.serviceUrl(),
                "raticketv2/ticket/nuovoTicket",
                "POST",
                Map.of("ticket", ticket)
        );

        return executePost(requestPayload);
    }

    /**
     * GET Intermediary: Fetches a ticket via its UUID by sending a POST to the proxy gateway
     */
    public String getTicketByUuid(String uuid) {
        GatewayRequest requestPayload = new GatewayRequest(
                config.appCode(),
                config.serviceUrl(),
                "raticketv2/ticket/ticketEdit",
                "POST",
                Map.of("uuid", uuid)
        );

        return executePost(requestPayload);
    }

    // Helper method to execute the raw HTTP POST to the external gateway
    private String executePost(GatewayRequest payload) {
        return restClient.post()
                .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                .body(payload)
                .retrieve()
                .body(String.class); // Returns the raw JSON response from Region Abruzzo as a String
    }
}