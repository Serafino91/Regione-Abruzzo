package com.accenture.ra.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.dto.request.ServiceDetail;
import com.accenture.ra.dto.response.RequestDetailResponse;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.mapper.ProjectMapper;
import com.accenture.ra.mapper.RequestMapper;
import com.accenture.ra.mapper.ServiceMapper;
import com.accenture.ra.mapper.ServiceTypeMapper;
import com.accenture.ra.mapper.StateMapper;
import com.accenture.ra.repository.ProjectRepository;
import com.accenture.ra.repository.RequestRepository;
import com.accenture.ra.repository.ServiceRepository;
import com.accenture.ra.repository.ServiceTypeRepository;
import com.accenture.ra.repository.StateRepository;
import com.accenture.ra.request.RequestCreationRequest;
import com.accenture.ra.request.RequestFilterCriteria;
import com.accenture.ra.service.RequestService;
import com.accenture.ra.utils.RequestIdGenerator;
import com.accenture.ra.utils.RequestSpecification;

import lombok.RequiredArgsConstructor;

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
		// arriva oggetto, controllo per id e poi nome se già esistente, poi continuo 
		// 
		reqDetail.setProject(testProjectMapper.toModel(createOrFindProject(req)));
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

	private ProjectEntity createOrFindProject(RequestCreationRequest req) {
		if(projectRepository.existsById(req.getProject().getId())) {
			return projectRepository.getReferenceById(req.getProject().getId());
		} 
		else if(!projectRepository.existsByName(req.getProject().getName())) { 
			ProjectEntity newProject = new ProjectEntity();
			newProject.setName(req.getProject().getName());
			newProject.setDescription(req.getProject().getDescription());
//			newProject.setDestinationLink(req.getProject().getDestinationLink());
			return projectRepository.save(newProject);
		} 
		else {
			throw new IllegalArgumentException("Project with name " + req.getProject().getName() + " already exists.");
		}
			
		
	}

	@Override
	public List<RequestDetail> filterRequest(RequestFilterCriteria criteria) {
		// Utilizzo la Specification per costruire la query dinamicamente
		List<RequestEntity> entities = requestRepository.findAll(RequestSpecification.withFilters(criteria));
		return testRequestMapper.toModelList(entities);
	}

}
