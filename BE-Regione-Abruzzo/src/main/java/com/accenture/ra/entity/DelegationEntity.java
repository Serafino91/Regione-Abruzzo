package com.accenture.ra.entity;

import com.accenture.ra.enums.DelegateType;
import com.accenture.ra.enums.DelegationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.Builder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "delegations")
@SQLDelete(sql = "UPDATE delegations SET `deleted` = true WHERE id=?")
@SQLRestriction("deleted = false")
public class DelegationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "delegation_date")
    private LocalDateTime delegationDate;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "delegation_type")
    private DelegateType delegateType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private DelegationStatus status;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "project_delegations",
            joinColumns = @JoinColumn(name = "delegation_id"),
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

    @Column(name = "deleted", nullable = false)
    @Builder.Default
    private boolean deleted = false;
}
