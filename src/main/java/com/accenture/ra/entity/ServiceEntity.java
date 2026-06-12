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

//    @Column(name = "catalog_id")
//    private String catalogId;

    @Column(name = "type")
    private String serviceType;

    @Column(name = "item")
    private String itemName;

    @Column(name = "base")
    private Boolean isBase;

    @Column(name = "optional")
    private Boolean isOptional;

    @Column(name = "vcpu")
    private Integer vcpu;

    @Column(name = "vram_gb")
    private Integer vramGb;

    @Column(name = "storage_gb")
    private Integer storageGb;

    @Column(name = "minimum_technical_features")
    private String minimumTechnicalFeatures;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "duration_months")
    private Integer durationMonths;
}
