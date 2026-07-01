package com.accenture.ra.service.impl;

import com.accenture.ra.entity.Role;
import com.accenture.ra.entity.User;
import com.accenture.ra.repository.RoleRepository;
import com.accenture.ra.repository.UserRepository;
import com.accenture.ra.service.CensimentoService;
import com.accenture.ra.service.JwtService;
import com.accenture.ra.service.RaTichetService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

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

        // Logica di Censimento ed eventuale assegnazione del Ruolo
        User utente = userRepository.findByCodiceFiscale(codiceFiscale)
                .map(esistente -> {
                    esistente.setEmail(email); // Aggiorna l'email se modificata su SPID
                    return userRepository.save(esistente);
                })
                .orElseGet(() -> {
                    User nuovo = new User();
                    nuovo.setCodiceFiscale(codiceFiscale);
                    nuovo.setEmail(email);
                    nuovo.setDataCensimento(LocalDateTime.now());
                    nuovo.setStatoAccreditamento(User.StatoAccreditamento.IN_ATTESA);

                    // Recupera il ruolo standard dal database usando il RoleRepository
                    Role defaultRole = roleRepository.findByName("ROLE_USER")
                            .orElseThrow(() -> new RuntimeException("Configurazione DB Errata: Ruolo 'ROLE_USER' non trovato."));

                    nuovo.setRoles(Set.of(defaultRole));

                    User salvato = userRepository.save(nuovo);

                    // Richiesta asincrona verso il Mock di RaTicheT Regione Abruzzo
                    raTichetService.richiediAccreditamentoUtenza(codiceFiscale, email);

                    return salvato;
                });

        // Passiamo CF, Stato e l'insieme dei Ruoli reali dell'utente al generatore JWT
        String jwtLocale = jwtService.generaTokenLocale(
                utente.getCodiceFiscale(),
                utente.getStatoAccreditamento().name(),
                utente.getRoles()
        );

        return Map.of(
                "token", jwtLocale,
                "statoAccreditamento", utente.getStatoAccreditamento().name(),
                "codiceFiscale", utente.getCodiceFiscale()
        );
    }
}