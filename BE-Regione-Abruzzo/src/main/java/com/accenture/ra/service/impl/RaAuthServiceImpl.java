package com.accenture.ra.service.impl;

import com.accenture.ra.dto.response.RaAuthUserResponse;
import com.accenture.ra.service.RaAuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class RaAuthServiceImpl implements RaAuthService {

    @Value("${ra.auth.base-url}")
    private String baseUrl;

    @Value("${ra.auth.app-code}")
    private String appCode;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public RaAuthUserResponse searchUser(
            String codiceFiscale,
            String accessToken) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> payload = Map.of(
                "appCode", appCode,
                "CF", codiceFiscale
        );

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(payload, headers);

        ResponseEntity<RaAuthUserResponse> response =
                restTemplate.exchange(
                        baseUrl + "/data/searchUser",
                        HttpMethod.POST,
                        entity,
                        RaAuthUserResponse.class
                );

        return response.getBody();
    }
}
