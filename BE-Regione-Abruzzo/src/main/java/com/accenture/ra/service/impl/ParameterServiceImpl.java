package com.accenture.ra.service.impl;

import java.util.List;

import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.model.ParamDetail;
import com.accenture.ra.service.ParamMapper;
import com.accenture.ra.service.ParameterService;

import org.springframework.beans.factory.annotation.Autowired;

public class ParameterServiceImpl implements ParameterService {
	

    @Autowired
    private ParamRepository paramRepository;
    @Autowired
    private ParamMapper paramMapper;

	@Override
	public ParamDetail getParamById(String paramId) {
		
		 ServiceEntity entity = paramRepository.findById(paramId)
	             .orElseThrow(() -> new RuntimeException("Servizio non trovato: " + serviceId));

	        return paramMapper.toModel(entity);	}

	@Override
	public ParamDetail getAllParams(String paramId) {
		
		List<ServiceEntity> entity = paramRepository.findAll();

        return paramMapper.toModelList(entity);
	}

}
