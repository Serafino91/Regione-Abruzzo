package com.accenture.ra.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "projects")
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "destination_link")
    private String destinationLink;

    @Column(name = "description")
    private String description;

    // Delegato interamente al DDL (DEFAULT CURRENT_TIMESTAMP)
    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    // Delegato interamente al DDL (ON UPDATE CURRENT_TIMESTAMP)
    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private UserEntity createdBy;

    // Relazione N:M con ServiceEntity
    @Builder.Default
    @ManyToMany
    @JoinTable(
            name = "project_service",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    @JsonIgnoreProperties("projects")
    private Set<ServiceEntity> services = new HashSet<>();

    // Relazione bidirezionale N:M con Delegates
    @Builder.Default
    @ManyToMany(mappedBy = "projects", fetch = FetchType.LAZY)
    private List<DelegationEntity> delegates = new ArrayList<>();
}