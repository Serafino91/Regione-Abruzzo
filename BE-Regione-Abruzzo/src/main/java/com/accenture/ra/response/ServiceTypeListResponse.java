package com.accenture.ra.response;

import java.util.List;

import com.accenture.ra.model.ServiceType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceTypeListResponse {

    private List<ServiceType> serviceType;

}
