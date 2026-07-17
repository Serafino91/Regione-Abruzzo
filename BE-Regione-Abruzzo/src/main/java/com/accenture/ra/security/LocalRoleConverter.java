package com.accenture.ra.security;

import com.accenture.ra.entity.User;
import com.accenture.ra.entity.Role; // Make sure this is your JPA Entity Role class
import com.accenture.ra.repository.UserRepository;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Component
public class LocalRoleConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final UserRepository userRepository;

    public LocalRoleConverter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public AbstractAuthenticationToken convert(Jwt jwt) {
        String fiscalNumber = jwt.getClaimAsString("sub");
        Set<GrantedAuthority> authorities = new HashSet<>();

        // 1. Fetch user from DB
        userRepository.findByFiscalNumber(fiscalNumber).ifPresent(user -> {
            // 2. Loop through all assigned database roles
            for (Role dbRole : user.getRoles()) {
                if (dbRole != null && dbRole.getName() != null) {
                    try {
                        // 3. Match database role name string to the Java RoleName Enum
                        RoleName roleNameEnum = RoleName.valueOf(dbRole.getName());//TODO

                        // 4. Collect both the role and its corresponding granular permissions
                        authorities.addAll(roleNameEnum.getGrantedAuthorities());//TODO
                    } catch (IllegalArgumentException e) {
                        // Safe fallback: If the database role isn't mapped in our Java Enum,
                        // ignore or log it instead of crashing the application.
                    }
                }
            }
        });

        // 5. Populate the Spring Security context with all gathered permissions
        return new JwtAuthenticationToken(jwt, authorities, fiscalNumber);
    }
}