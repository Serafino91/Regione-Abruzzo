package com.accenture.ra.service.impl;

import com.accenture.ra.service.JwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.Map;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    public String generaTokenLocale(String codiceFiscale, String statoAccreditamento, Collection<String> roles) {
        var key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .subject(codiceFiscale)
                .claims(Map.of(
                        "stato", statoAccreditamento,
                        "roles", roles
                ))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000)) // 1 giorno
                .signWith(key)
                .compact();
    }
}