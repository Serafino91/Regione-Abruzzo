package com.accenture.ra.dto.response;

import java.util.List;

import com.accenture.ra.dto.request.ServiceType;

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
