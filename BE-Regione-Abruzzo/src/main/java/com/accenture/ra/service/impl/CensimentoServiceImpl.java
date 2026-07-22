package com.accenture.ra.service.impl;

import com.accenture.ra.entity.Delegates;
import com.accenture.ra.entity.User;
import com.accenture.ra.enums.RoleType;
import com.accenture.ra.enums.AccreditationStatus;
import com.accenture.ra.repository.RoleRepository;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.service.CensimentoService;
import com.accenture.ra.service.JwtService;
import com.accenture.ra.service.RaTichetService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class CensimentoServiceImpl implements CensimentoService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RaTichetService raTichetService;
    private final JwtService jwtService;

    public CensimentoServiceImpl(UserRepository userRepository,
                                 RoleRepository roleRepository,
                                 RaTichetService raTichetService,
                                 JwtService jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.raTichetService = raTichetService;
        this.jwtService = jwtService;
    }

    @Override
    @Transactional
    public Map<String, String> eseguiCensimentoEAutenticazione(Map<String, Object> userInfoClaims) {
        String cfGrezzo = (String) userInfoClaims.get("fiscal_number");
        String email = (String) userInfoClaims.get("email");

        if (cfGrezzo == null || email == null) {
            throw new IllegalArgumentException("Dati minimi OIDC (Codice Fiscale/Email) assenti.");
        }

        // Pulizia prefisso istituzionale SPID
        String codiceFiscale = cfGrezzo.toUpperCase().startsWith("TINIT-") ? cfGrezzo.substring(6) : cfGrezzo;

        // Logica di Censimento
        User utente = userRepository.findByFiscalCode(codiceFiscale)
                .map(esistente -> {
                    esistente.setEmail(email); // Aggiorna l'email se modificata su SPID
                    return userRepository.save(esistente);
                })
                .orElseGet(() -> {
                    User nuovo = new User();
                    nuovo.setFiscalCode(codiceFiscale);
                    nuovo.setEmail(email);
                    nuovo.setSignupDate(LocalDateTime.now()); // Data di creazione impostata qui
                    nuovo.setAccreditationStatus(AccreditationStatus.IN_ATTESA);
                    nuovo.setActive(true);

                    // Assegnazione diretta dell'enum di default
                    nuovo.setRole(RoleType.ROLE_USER);

                    User salvato = userRepository.save(nuovo);

                    // Richiesta asincrona verso il Mock di RaTicheT Regione Abruzzo
                    raTichetService.richiediAccreditamentoUtenza(codiceFiscale, email);

                    return salvato;
                });

        // Raccogliamo le authorities reali (ruolo primario + eventuali deleghe attive)
        List<String> rolesOrAuthorities = estraiAuthoritiesString(utente);

        // Generazione Token JWT
        String jwtLocale = jwtService.generaTokenLocale(
                utente.getFiscalCode(),
                utente.getAccreditationStatus().name(),
                rolesOrAuthorities
        );

        return Map.of(
                "token", jwtLocale,
                "statoAccreditamento", utente.getAccreditationStatus().name(),
                "codiceFiscale", utente.getFiscalCode()
        );
    }

    /**
     * Helper per estrarre sia il ruolo base sia le deleghe attive come stringhe
     */
    private List<String> estraiAuthoritiesString(User user) {
        List<String> authorities = new ArrayList<>();

        // 1. Ruolo primario
        if (user.getRole() != null) {
            authorities.add(user.getRole().name());
        }

        // 2. Ruoli/Tipi da deleghe attive
        if (user.getDelegates() != null) {
            user.getDelegates().stream()
                    .filter(Delegates::isActive)
                    .map(Delegates::getDelegateType)
                    .filter(Objects::nonNull)
                    .map(Enum::name)
                    .forEach(authorities::add);
        }

        return authorities;
    }
}
