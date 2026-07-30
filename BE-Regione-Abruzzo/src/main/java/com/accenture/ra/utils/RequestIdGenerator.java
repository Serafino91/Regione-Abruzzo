package com.accenture.ra.utils;

import java.util.UUID;

public class RequestIdGenerator {

	public static String generateId() {
        return "req_" + UUID.randomUUID().toString().replace("-", "");
    }

}
