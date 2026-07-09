package com.accenture.ra.dto.response;

import com.accenture.ra.dto.request.ServiceDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDetailResponse {

        private ServiceDetail serviceDetail;
}

