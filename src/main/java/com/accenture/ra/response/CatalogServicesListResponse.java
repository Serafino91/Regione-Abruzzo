package com.accenture.ra.response;

import com.accenture.ra.model.ServiceDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CatalogServicesListResponse {
    private List<ServiceDetail> serviceDetail;
}
