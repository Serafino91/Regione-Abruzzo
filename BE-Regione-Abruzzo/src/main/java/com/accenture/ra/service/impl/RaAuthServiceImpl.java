package com.accenture.ra.service.impl;

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
    public Map<String, Object> getRolesForUser(String accessToken) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> payload = Map.of(
                "appCode", appCode
        );

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(payload, headers);

        ResponseEntity<Map> response =
                restTemplate.exchange(
                        baseUrl + "/data/getRolesForUser",
                        HttpMethod.POST,
                        entity,
                        Map.class
                );

        return response.getBody();
    }
}
