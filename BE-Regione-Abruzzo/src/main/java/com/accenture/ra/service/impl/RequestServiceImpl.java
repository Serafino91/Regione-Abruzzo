package com.accenture.ra.service.impl;

import java.util.List;

import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.model.RequestDetail;
import com.accenture.ra.repository.RequestRepository;
import com.accenture.ra.service.RequestMapper;
import com.accenture.ra.service.RequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestServiceImpl implements RequestService {

	@Autowired
	private RequestRepository requestRepository;
	
	@Override
	public List<RequestDetail> getAllRequests() {
		List<RequestEntity> entity = requestRepository.findAll();

        return RequestMapper.toModelList(entity);
	}

	@Override
	public RequestDetail getRequestById(String requestId) {
		RequestEntity requestEntity = requestRepository.findById(requestId).get();
        return RequestMapper.toModel(requestEntity);
	}

}
