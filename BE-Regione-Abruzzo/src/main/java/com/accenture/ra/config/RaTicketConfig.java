package com.accenture.ra.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(RaTicketProperties.class)
public class RaTicketConfig {
    // This activates the property-to-record binding automatically at startup
}
