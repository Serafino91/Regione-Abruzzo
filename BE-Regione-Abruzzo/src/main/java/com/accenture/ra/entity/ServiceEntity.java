package com.accenture.ra.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "service")
@SQLDelete(sql = "UPDATE service SET deleted = true WHERE id=?")
@SQLRestriction("deleted = false")
public class ServiceEntity {

    @Id
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_base")
    private Boolean isBase;

    @Column(name = "is_optional")
    private Boolean isOptional;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_type_id", nullable = false)
    private ServiceTypeEntity serviceType;

    @ManyToMany(mappedBy = "services")
    @JsonIgnoreProperties("services")
    private Set<ProjectEntity> projects = new HashSet<>();

    @OneToMany(mappedBy = "service", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ParamEntity> params = new ArrayList<>();
    @Column(name = "deleted", nullable = false)
    @Builder.Default
    private boolean deleted = false;

}