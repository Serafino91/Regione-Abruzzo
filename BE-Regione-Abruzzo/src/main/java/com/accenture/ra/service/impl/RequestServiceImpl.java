package com.accenture.ra.service.impl;

import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.dto.request.ServiceDetail;
import com.accenture.ra.dto.response.RequestDetailResponse;
import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.mapper.*;
import com.accenture.ra.repository.*;
import com.accenture.ra.request.RequestCreationRequest;
import com.accenture.ra.service.RequestService;
import com.accenture.ra.utils.RequestIdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

	private final RequestRepository requestRepository;
	private final ProjectRepository projectRepository;
	private final ServiceTypeRepository categoryRepository;
	private final ServiceRepository serviceRepository;
	private final StateRepository stateRepository;
	private final RequestMapper testRequestMapper;
	private final ProjectMapper testProjectMapper;
	private final ServiceTypeMapper testServiceTypeMapper;
	private final ServiceMapper testServiceMapper;
	private final StateMapper testStateMapper;


	@Override
	public List<RequestDetail> getAllRequests() {
		List<RequestEntity> entity = requestRepository.findAll();

        return testRequestMapper.toModelList(entity);
	}

	@Override
	public RequestDetail getRequestById(String requestId) {
		RequestEntity requestEntity = requestRepository.findById(requestId).get();
        return testRequestMapper.toModel(requestEntity);
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
		reqDetail.setProject(testProjectMapper.toModel(projectRepository.getReferenceById(Long.parseLong(req.getProject()))));
		reqDetail.setCategory(testServiceTypeMapper.toModel(categoryRepository.getReferenceById(req.getCategory()))); // se cerco nelle repo verifico che ciò che mi arriva sia corretto o cerco direttamente?
		// I SERVIZI SARANNO N
		List<ServiceDetail> servicesList = new ArrayList<>();
		for (String service : req.getServices()) {
			servicesList.add(testServiceMapper.toModel(serviceRepository.getReferenceById(service))); // TODO: caso di service non trovato?
		}
		reqDetail.setServices(servicesList); // sarà possibile selezionarne più di uno se si vuole
		reqDetail.setState(testStateMapper.toModel(stateRepository.getReferenceById(Long.parseLong(req.getState()))));
		reqDetail.setSendFrom(req.getSendFrom());
		reqDetail.setSendTo(req.getSendTo());
		reqDetail.setCreatedAt(LocalDateTime.now());
		reqDetail.setUpdatedAt(LocalDateTime.now());

		requestResp.setRequestDetail(reqDetail);

		// TODO: save a db - Save andata a buon fine + save non riuscita ... altri casi?
		// ADD SAVE
		requestRepository.save(testRequestMapper.toEntity(reqDetail));

		return requestResp;
	}

}
