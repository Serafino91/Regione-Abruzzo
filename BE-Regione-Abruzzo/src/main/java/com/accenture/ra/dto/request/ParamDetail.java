package com.accenture.ra.dto.request;

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
    private Boolean isRequired;
    private String serviceId;

}