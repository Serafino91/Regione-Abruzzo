package com.accenture.ra.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @Column(name = "param_list_id")
    private Long paramListId;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "id",
            referencedColumnName = "param_list_id",
            insertable = false,
            updatable = false
    )
    private List<ParamListEntity> paramList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_type_id", nullable = false)
    private ServiceTypeEntity serviceType;

    @ManyToMany(mappedBy = "services")
    @JsonIgnoreProperties("services")
    private Set<ProjectEntity> projects = new HashSet<>();

    @OneToMany(mappedBy = "service", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ParamEntity> params = new ArrayList<>();
}