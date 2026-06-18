package com.accenture.ra.service;

import com.accenture.ra.model.ParamDetail;

public interface ParameterService {
	
	public ParamDetail getParamById(String paramId);
	
	public ParamDetail getAllParams(String paramId);
	
	
}
