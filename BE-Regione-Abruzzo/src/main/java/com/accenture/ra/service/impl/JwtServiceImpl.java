package com.accenture.ra.service.impl;

import com.accenture.ra.entity.Role;
import com.accenture.ra.service.JwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    public String generaTokenLocale(String codiceFiscale, String statoAccreditamento, Set<Role> roles) {
        var key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        // Mappiamo i ruoli estratti dalla tua entity Role in stringhe (es. ["ROLE_USER"])
        List<String> ruoliStringhe = roles.stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return Jwts.builder()
                .subject(codiceFiscale)
                .claims(Map.of(
                        "stato", statoAccreditamento,
                        "roles", ruoliStringhe
                ))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000)) // 1 giorno
                .signWith(key)
                .compact();
    }
}