package com.accenture.ra.service.impl;

import java.util.List;

import com.accenture.ra.entity.ServiceTypeEntity;
import com.accenture.ra.model.ServiceType;
import com.accenture.ra.repository.ServiceTypeRepository;
import com.accenture.ra.service.ServiceTypeMapper;
import com.accenture.ra.service.TypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypeServiceImpl implements TypeService {

	 @Autowired
	 private ServiceTypeRepository serviceTypeRepository;
	
	@Override
	public List<ServiceType> getAllServiceTypes() {
		List<ServiceTypeEntity> entity = serviceTypeRepository.findAll();

        return ServiceTypeMapper.toModelList(entity);
	}

}
