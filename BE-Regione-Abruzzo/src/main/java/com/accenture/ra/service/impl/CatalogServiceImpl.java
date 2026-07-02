package com.accenture.ra.service.impl;

import java.util.List;

import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.entity.ServiceTypeEntity;
import com.accenture.ra.mapper.ServiceMapper;
import com.accenture.ra.model.ServiceDetail;
import com.accenture.ra.repository.ServiceRepository;
import com.accenture.ra.request.ServicePatchRequest;
import com.accenture.ra.service.CatalogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CatalogServiceImpl implements CatalogService {

    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ServiceMapper serviceMapper;

	/**
	 * Gets the single service by id.
	 *
	 * @param serviceId the service identifier
	 * @return the service detail
	 */
    @Override
    public ServiceDetail getServiceById(String serviceId) {
        ServiceEntity entity = serviceRepository.findById(serviceId)
             .orElseThrow(() -> new RuntimeException("Servizio non trovato: " + serviceId));

        return serviceMapper.toModel(entity);
    }


	/**
	 * Gets the catalog services list.
	 *
	 * @return the catalog services list
	 */
    @Override
    public List<ServiceDetail> getServiceAll() {
        List<ServiceEntity> entity = serviceRepository.findAll();

        return serviceMapper.toModelList(entity);
    }

    @Override
    public List<ServiceDetail> getServiceByCategoryId(Long serviceId) {
        List<ServiceEntity> entity = serviceRepository.findAllByServiceTypeId(serviceId);

        return serviceMapper.toModelList(entity);
    }

    /**
	 * ...
	 *
	 * @return ...
	 */
    public ServiceDetail patchService(String serviceId, ServicePatchRequest request) {
        return null;
    }

    /**
	 * ...
	 *
	 * @return ...
	 */
    public Boolean deleteService(String serviceId) {
      return true;
    }
}
