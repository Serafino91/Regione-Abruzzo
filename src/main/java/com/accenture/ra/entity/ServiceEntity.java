package com.accenture.ra.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "services")
public class ServiceEntity {

    @Id
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "base")
    private Boolean isBase;

    @Column(name = "optional")
    private Boolean isOptional;
    
    @Column(name = "type")
    private ServiceTypeEntity serviceType;
}
