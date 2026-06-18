package com.accenture.ra.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParamDetail {

    private String id;
    private String name;
    private String paramType;
    private String minValue;
    private String maxValue;
    private boolean isRequired;
    private String serviceId;

}