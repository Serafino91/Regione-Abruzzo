package com.accenture.ra.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDetail {

    private String id;
    private String type;
    private String item;
    private Boolean base;
    private Boolean optional;
    private Integer vcpu;
    private Integer vramGb;
    private Integer storageGb;
    private String minimumTechnicalFeatures;
    private Integer quantity;
    private Integer durationMonths;
}