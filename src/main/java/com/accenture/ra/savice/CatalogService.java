package com.accenture.ra.savice;

import com.accenture.ra.model.ServiceDetail;
import com.accenture.ra.model.ServicePatchRequest;
import org.springframework.stereotype.Service;

@Service
public class CatalogService {
    public ServiceDetail getServiceById(String serviceId) {
            return new ServiceDetail();
    }

    public ServiceDetail patchService(String serviceId, ServicePatchRequest request) {
        return null;
    }

    public Boolean deleteService(String serviceId) {
      return true;
    }
}
