package com.accenture.ra.service.impl;

import com.accenture.ra.entity.ParamEntity;
import com.accenture.ra.mapper.ParamMapper;
import com.accenture.ra.model.ParamDetail;
import com.accenture.ra.repository.ParamRepository;
import com.accenture.ra.service.ParameterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParameterServiceImpl implements ParameterService {
	

    @Autowired
    private ParamRepository paramRepository;


	@Override
	public ParamDetail getParamById(Long paramId) {
		
		 ParamEntity entity = paramRepository.findById(paramId)
	             .orElseThrow(() -> new RuntimeException("Servizio non trovato: " + paramId));

	        return ParamMapper.toModel(entity);	}

	@Override
	public List<ParamDetail> getAllParams() {
		
		List<ParamEntity> entity = paramRepository.findAll();

        return ParamMapper.toModelList(entity);
	}

}
