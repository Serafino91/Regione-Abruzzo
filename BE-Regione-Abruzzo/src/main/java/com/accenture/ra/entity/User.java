package com.accenture.ra.entity;

import com.accenture.ra.enums.RoleType;
import com.accenture.ra.enums.StatoAccreditamento;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users") // <--- Modificato da "utenti_censiti" a "users" per allinearsi al tuo DB
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codice_fiscale", unique = true, nullable = false, length = 16)
    private String fiscalCode;

    @Column(name = "email", nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "stato_accreditamento", nullable = false)
    private StatoAccreditamento statoAccreditamento;

    @Column(name = "signup_date")
    private LocalDateTime signupDate;

    @Column(name = "role")
    private RoleType role;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Delegates> delegates = new ArrayList<>();

    @Column(name = "is_active")
    private boolean active;
}