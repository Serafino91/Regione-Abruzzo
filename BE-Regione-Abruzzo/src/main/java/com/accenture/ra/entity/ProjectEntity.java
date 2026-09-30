package com.accenture.ra.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
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
@Table(name = "project")
@SQLDelete(sql = "UPDATE project SET deleted = true WHERE id=?")
@SQLRestriction("deleted = false")
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "destination_link")
    private String destinationLink;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

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
//    public void updateFromModel(ProjectDetail model) {
//        if (model == null) return;
//
//        this.name = model.getName();
//        this.destinationLink = model.getDestinationLink();
//        this.description = model.getDescription();
//        this.updatedAt = model.getUpdateAt();
//    }
    @Column(name = "deleted", nullable = false)
    @Builder.Default
    private boolean deleted = false;

}