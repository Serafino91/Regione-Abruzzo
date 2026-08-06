package com.accenture.ra.entity;

import com.accenture.ra.enums.DelegateType;
import com.accenture.ra.enums.DelegationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "delegations")
public class DelegationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "delegation_date")
    private LocalDateTime delegationDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "delegation_type")
    private DelegateType delegateType;

    @Column(name = "status")
    private DelegationStatus status;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "delegate_projects",
            joinColumns = @JoinColumn(name = "delegates_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private List<ProjectEntity> projects;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity delegatedUser;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "delegated_by", nullable = false)
    private UserEntity delegatedBy;
}
