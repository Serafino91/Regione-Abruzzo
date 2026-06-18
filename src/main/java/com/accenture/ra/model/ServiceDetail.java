package com.accenture.ra.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    private Integer quantity;
    private Integer durationMonths;
    private List<ParamDetail> params;
}