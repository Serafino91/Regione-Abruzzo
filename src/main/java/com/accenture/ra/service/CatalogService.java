package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.model.ServiceDetail;
import com.accenture.ra.model.ServicePatchRequest;

public interface CatalogService {

	public ServiceDetail getServiceById(String serviceId);
    
    public List<ServiceDetail> getServiceAll();

    public ServiceDetail patchService(String serviceId, ServicePatchRequest request);
	
    public Boolean deleteService(String serviceId);
    
}
