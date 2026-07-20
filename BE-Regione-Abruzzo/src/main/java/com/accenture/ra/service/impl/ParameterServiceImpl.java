package com.accenture.ra.service.impl;

import com.accenture.ra.entity.ParamEntity;
import com.accenture.ra.dto.request.ParamDetail;
import com.accenture.ra.mapper.ParamMapper;
import com.accenture.ra.repository.ParamRepository;
import com.accenture.ra.service.ParameterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParameterServiceImpl implements ParameterService {
	
	private final ParamRepository paramRepository;
	private final ParamMapper testParamMapper;

	@Override
	public ParamDetail getParamById(Long paramId) {
		
		 ParamEntity entity = paramRepository.findById(paramId)
	             .orElseThrow(() -> new RuntimeException("Servizio non trovato: " + paramId));

	        return testParamMapper.toModel(entity);
	}

	@Override
	public List<ParamDetail> getAllParams() {
		
		List<ParamEntity> entity = paramRepository.findAll();

         return testParamMapper.toModelList(entity);
	}

}