package com.accenture.ra.service;

import com.accenture.ra.model.ParamDetail;

import java.util.List;

public interface ParameterService {
	
	public ParamDetail getParamById(Long paramId);
	
	public List<ParamDetail> getAllParams(Long paramId);

	
}
