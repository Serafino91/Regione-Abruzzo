package com.accenture.ra.entity;

import com.accenture.ra.enums.RoleType;
import com.accenture.ra.enums.AccreditationStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$", message = "Formato Codice Fiscale non valido")
    @Column(name = "codice_fiscale", unique = true, nullable = false, length = 16)
    private String fiscalCode;

    @NotBlank
    @Size(max = 50)
    @Column(name = "nome", nullable = false, length = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    @Column(name = "cognome", nullable = false, length = 50)
    private String lastName;

    @NotBlank
    @Email
    @Column(name = "email", nullable = false)
    private String email;

    @Email
    @Size(max = 255)
    @Column(name = "pec", length = 255)
    private String pec;

    @Pattern(regexp = "^[0-9]{11}$", message = "La Partita IVA deve contenere esattamente 11 cifre numeriche")
    @Column(name = "partita_iva", length = 11)
    private String vatNumber;

    @Size(max = 100)
    @Column(name = "ruolo_aziendale", length = 100)
    private String companyRole;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "stato_accreditamento", nullable = false, length = 50)
    private AccreditationStatus accreditationStatus;

    @Column(name = "signup_date")
    private LocalDateTime signupDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 50)
    private RoleType role;

    @JsonIgnore
    @OneToMany(mappedBy = "delegatedBy", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<DelegationEntity> delegates = new ArrayList<>();

    @Column(name = "is_active", nullable = false)
    private boolean active;

    public void addDelegation(DelegationEntity delegation) {
        delegates.add(delegation);
        delegation.setDelegatedUser(this);
    }
}