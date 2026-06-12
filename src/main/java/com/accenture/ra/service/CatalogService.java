package com.accenture.ra.service;

import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.model.ServiceDetail;
import com.accenture.ra.model.ServicePatchRequest;
import com.accenture.ra.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CatalogService {

    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ServiceMapper serviceMapper;

    public ServiceDetail getServiceById(String serviceId) {
        ServiceEntity entity = serviceRepository.findById(serviceId)
             .orElseThrow(() -> new RuntimeException("Servizio non trovato: " + serviceId));

        return serviceMapper.toModel(entity);
    }


    public List<ServiceDetail> getServiceAll() {
        List<ServiceEntity> entity = serviceRepository.findAll();

        return serviceMapper.toModelList(entity);
    }



    public ServiceDetail patchService(String serviceId, ServicePatchRequest request) {
        return null;
    }

    public Boolean deleteService(String serviceId) {
      return true;
    }
}
