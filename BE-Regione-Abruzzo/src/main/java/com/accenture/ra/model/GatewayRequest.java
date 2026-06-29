package com.accenture.ra.model;

import java.util.Map;

/**
 * Envelope record matching the structure expected by the Region Abruzzo gateway proxy.
 */
public record GatewayRequest(
        String appCode,
        String service,
        String path,
        String method,
        Map<String, Object> parameters
) {}