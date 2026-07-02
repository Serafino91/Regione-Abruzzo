package com.accenture.ra.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.mapper.ProjectMapper;
import com.accenture.ra.mapper.RequestMapper;
import com.accenture.ra.mapper.ServiceMapper;
import com.accenture.ra.mapper.ServiceTypeMapper;
import com.accenture.ra.mapper.StateMapper;
import com.accenture.ra.model.RequestDetail;
import com.accenture.ra.model.ServiceDetail;
import com.accenture.ra.repository.ProjectRepository;
import com.accenture.ra.repository.RequestRepository;
import com.accenture.ra.repository.ServiceRepository;
import com.accenture.ra.repository.ServiceTypeRepository;
import com.accenture.ra.repository.StateRepository;
import com.accenture.ra.request.RequestCreationRequest;
import com.accenture.ra.response.RequestDetailResponse;
import com.accenture.ra.service.RequestService;
import com.accenture.ra.utils.RequestIdGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestServiceImpl implements RequestService {

	@Autowired
	private RequestRepository requestRepository;
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private ServiceTypeRepository categoryRepository;
	@Autowired
	private ServiceRepository serviceRepository;
	@Autowired
	private StateRepository stateRepository;
	
	
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

	@Override
	public RequestDetailResponse createRequest(RequestCreationRequest req) {

		// Flusso creazione request in completamento
		// TODO: Sistemare controlli/eccezioni
		RequestDetailResponse requestResp = new RequestDetailResponse();
		RequestDetail reqDetail = new RequestDetail();
		reqDetail.setRequestId(RequestIdGenerator.generateId());
		// Cosa riceverò nel requestbody per project,cetegory,service,state? MODIFICARE se necessario
		// TODO: flussi diversi per caso di PROGETTO NUOVO e caso PRE ESISTENTE
		reqDetail.setProject(ProjectMapper.toModel(projectRepository.getReferenceById(Long.parseLong(req.getProject())))); 
		reqDetail.setCategory(ServiceTypeMapper.toModel(categoryRepository.getReferenceById(req.getCategory()))); // se cerco nelle repo verifico che ciò che mi arriva sia corretto o cerco direttamente?
		// I SERVIZI SARANNO N
		List<ServiceDetail> servicesList = new ArrayList<>();
		for (String service : req.getServices()) {
			servicesList.add(ServiceMapper.toModel(serviceRepository.getReferenceById(service))); // TODO: caso di service non trovato?
		}
		reqDetail.setServices(servicesList); // sarà possibile selezionarne più di uno se si vuole
		reqDetail.setState(StateMapper.toModel(stateRepository.getReferenceById(Long.parseLong(req.getState()))));
		reqDetail.setSendFrom(req.getSendFrom());
		reqDetail.setSendTo(req.getSendTo()); 
		reqDetail.setCreatedAt(LocalDateTime.now());
		reqDetail.setUpdatedAt(LocalDateTime.now());
		
		requestResp.setRequestDetail(reqDetail);
		
		// TODO: save a db - Save andata a buon fine + save non riuscita ... altri casi?
		// ADD SAVE
		requestRepository.save(RequestMapper.toEntity(reqDetail));
		
		return requestResp; 
	}

}
