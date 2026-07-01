package com.accenture.ra.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "users") // <--- Modificato da "utenti_censiti" a "users" per allinearsi al tuo DB
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codice_fiscale", unique = true, nullable = false, length = 16)
    private String codiceFiscale;

    @Column(name = "email", nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "stato_accreditamento", nullable = false)
    private StatoAccreditamento statoAccreditamento;

    @Column(name = "data_censimento")
    private LocalDateTime dataCensimento;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public enum StatoAccreditamento {
        IN_ATTESA, APPROVATO, RIFIUTATO
    }
}