package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.dto.request.ServiceDetail;
import com.accenture.ra.dto.request.ServicePatchRequest;
import com.accenture.ra.request.ServiceFilterCriteria;

public interface CatalogService {

	public ServiceDetail getServiceById(String serviceId);
    
    public List<ServiceDetail> getServiceAll();

    public ServiceDetail patchService(String serviceId, ServicePatchRequest request);
	
    public Boolean deleteService(String serviceId);

    public List<ServiceDetail> getServiceByCategoryId(Long serviceId);

    public List<ServiceDetail> filterService(ServiceFilterCriteria criteria);
}
