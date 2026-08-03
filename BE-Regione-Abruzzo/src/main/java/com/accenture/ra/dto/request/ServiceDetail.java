package com.accenture.ra.dto.request;

import com.accenture.ra.entity.ServiceTypeEntity;
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

    private Long id;
    private String name;
    private ServiceType type;
    private String item; // nel vecchio mapping ci inserivamo al name della service entity, ho mantenuto così nel mapper nuovo
    private Boolean base;
    private Boolean optional;
//    private Integer quantity;
//    private Integer durationMonths;
    private List<ParamDetail> params;
//    private List<ParamList> paramsList;
}