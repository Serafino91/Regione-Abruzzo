package com.accenture.ra.utils;

import java.util.concurrent.ThreadLocalRandom;

public class RequestIdGenerator {

	public static String generateId() {
        long number = ThreadLocalRandom.current().nextLong(1_000_000_000L, 10_000_000_000L);
        return "req_" + number;
    }

}
