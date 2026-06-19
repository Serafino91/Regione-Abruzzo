package com.accenture.ra.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "service")
public class ServiceEntity {

    @Id
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_base")
    private Boolean isBase;

    @Column(name = "is_optional")
    private Boolean isOptional;

    @Column(name = "values_json")
    private String values;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_type_id", nullable = false)
    private ServiceTypeEntity serviceType;

    @ManyToMany(mappedBy = "services")
    @JsonIgnoreProperties("services")
    private Set<ProjectEntity> projects = new HashSet<>();

    @OneToMany(mappedBy = "service", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ParamEntity> params = new ArrayList<>();
}