package com.accenture.ra.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.ra.dto.request.ServiceType;
import com.accenture.ra.entity.ServiceTypeEntity;
import com.accenture.ra.mapper.ServiceTypeMapper;
import com.accenture.ra.repository.ServiceTypeRepository;
import com.accenture.ra.service.TypeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TypeServiceImpl implements TypeService {

	 private final ServiceTypeMapper serviceTypeMapper;
	
	 @Autowired
	 private ServiceTypeRepository serviceTypeRepository;
	
	@Override
	public List<ServiceType> getAllServiceTypes() {
		List<ServiceTypeEntity> entity = serviceTypeRepository.findAll();

        return serviceTypeMapper.toModelList(entity);
	}

}
