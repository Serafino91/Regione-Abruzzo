package com.accenture.ra.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "ra-ticket")
public record RaTicketProperties(
        String gatewayUrl,
        String serviceUrl,
        String appCode
) {}