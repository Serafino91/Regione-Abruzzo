package com.accenture.ra.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.accenture.ra.model.ServiceDetail;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
@Table(name = "service")
public class ServiceEntity {

    @Id
    private Long id;

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