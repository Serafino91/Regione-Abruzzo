package com.accenture.ra.security;

import com.accenture.ra.entity.User;
import com.accenture.ra.entity.Role;
import com.accenture.ra.entity.Permission;
import com.accenture.ra.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class CustomOidcUserService extends OidcUserService {

    private final UserRepository userRepository;

    public CustomOidcUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        // 1. Fetch default user from ADFS
        OidcUser oidcUser = super.loadUser(userRequest);
        String fiscalNumber = oidcUser.getClaimAsString("sub");

        Set<GrantedAuthority> authorities = new HashSet<>(oidcUser.getAuthorities());

        // 2. Fetch local roles and permissions dynamically
        userRepository.findByFiscalNumber(fiscalNumber).ifPresent(user -> {//TODO
            for (Role dbRole : user.getRoles()) {//TODO
                // Add the role itself (e.g. "ROLE_DELEGATE")
                authorities.add(new SimpleGrantedAuthority(dbRole.getName()));

                // Add its granular permissions (e.g. "project:create")
                for (Permission perm : dbRole.getPermissions()) {
                    authorities.add(new SimpleGrantedAuthority(perm.getName()));//TODO
                }
            }
        });

        // 3. Return updated user back to Spring Security context
        return new DefaultOidcUser(authorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
    }
}