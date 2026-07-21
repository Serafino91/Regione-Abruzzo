package com.accenture.ra.entity;

import com.accenture.ra.enums.DelegateType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "delegates")
public class Delegates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "delegation_date")
    private LocalDateTime delegationDate;

    @Column(name = "delegation_type")
    private DelegateType delegateType;

    @Column(name = "is_active")
    private boolean active;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "delegate_projects",
            joinColumns = @JoinColumn(name = "delegates_id", nullable = true),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private List<ProjectEntity> projects;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
