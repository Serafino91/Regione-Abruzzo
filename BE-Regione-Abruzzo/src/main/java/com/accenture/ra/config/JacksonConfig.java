package com.accenture.ra.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        SimpleModule module = new SimpleModule();
        module.addDeserializer(LocalDateTime.class, new FlexibleLocalDateTimeDeserializer());
        mapper.registerModule(module);

        return mapper;
    }

    // Accepts: "2026-07-20", "2026-07-20T14:07:03.953Z", "2026-07-20T14:07:03", ""
    static class FlexibleLocalDateTimeDeserializer extends StdDeserializer<LocalDateTime> {

        FlexibleLocalDateTimeDeserializer() {
            super(LocalDateTime.class);
        }

        @Override
        public LocalDateTime deserialize(JsonParser p, DeserializationContext ctx) throws IOException {
            String value = p.getText();
            if (value == null || value.isBlank()) {
                return null;
            }
            // Strip trailing 'Z' or timezone offset so LocalDateTime can parse it
            String normalized = value.endsWith("Z") ? value.substring(0, value.length() - 1) : value;
            // Remove offset like "+02:00"
            normalized = normalized.replaceAll("[+-]\\d{2}:\\d{2}$", "");

            if (normalized.contains("T")) {
                return LocalDateTime.parse(normalized, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            }
            // Date-only → treat as start of day
            return LocalDate.parse(normalized, DateTimeFormatter.ISO_LOCAL_DATE).atStartOfDay();
        }
    }
}
