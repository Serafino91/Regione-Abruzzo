package com.accenture.ra.entity;

import com.accenture.ra.enums.RoleType;
import com.accenture.ra.enums.AccreditationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "codice_fiscale", unique = true, nullable = false, length = 16)
    private String fiscalCode;

    @NotBlank
    @Email
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "stato_accreditamento", nullable = false)
    private AccreditationStatus accreditationStatus;

    @Column(name = "signup_date")
    private LocalDateTime signupDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private RoleType role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Delegates> delegates = new ArrayList<>();

    @Column(name = "is_active")
    private boolean active;

    public void addDelegation(Delegates delegation) {
        delegates.add(delegation);
        delegation.setUser(this);
    }
}