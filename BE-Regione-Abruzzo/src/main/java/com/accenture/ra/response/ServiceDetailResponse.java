package com.accenture.ra.response;

import com.accenture.ra.model.ServiceDetail;

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

