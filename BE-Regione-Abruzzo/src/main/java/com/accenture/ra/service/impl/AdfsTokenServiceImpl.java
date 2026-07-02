package com.accenture.ra.service.impl;

import com.accenture.ra.service.AdfsTokenService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class AdfsTokenServiceImpl implements AdfsTokenService {

    private final RestClient restClient;

    @Value("${ra.adfs.token-url:}")
    private String tokenUrl;

    @Value("${ra.adfs.client-id:}")
    private String clientId;

    @Value("${ra.adfs.client-secret:}")
    private String clientSecret;

    @Value("${ra.adfs.scope:}")
    private String scope;

    public AdfsTokenServiceImpl(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
    }

    @Override
    public String getAdfsToken() {
        if (tokenUrl == null || tokenUrl.isBlank()) {
            return "MOCK_BEARER_TOKEN_ADFS_ABRUZZO_XYZ123";
        }

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);
        formData.add("grant_type", "client_credentials");
        formData.add("scope", scope);

        Map<String, Object> response = restClient.post()
                .uri(tokenUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(formData)
                .retrieve()
                .body(Map.class);

        if (response == null || !response.containsKey("access_token")) {
            throw new IllegalStateException("Campo access_token assente nella risposta ADFS");
        }

        return (String) response.get("access_token");
    }
}