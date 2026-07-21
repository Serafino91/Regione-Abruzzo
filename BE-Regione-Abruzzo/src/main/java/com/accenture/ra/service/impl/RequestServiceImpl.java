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
	private final StateMapper stateMapper;


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
		if (req.getCategory() != null) {
			reqDetail.setCategory(req.getCategory());
		}
		// I SERVIZI SARANNO N

		reqDetail.setServices(req.getServices()); // sarà possibile selezionarne più di uno se si vuole
		reqDetail.setState(stateMapper.toModel(stateRepository.findByStateName(req.getState()).get())); //TODO da cambiare non mi piace
//		stateRepository.findByStateName(req.getState().getStateName())
//				.map(testStateMapper::toModel)
//				.ifPresent(reqDetail::setState);
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
		else if(!projectRepository.existsByNameAndDestinationLink(req.getProject().getName(),req.getProject().getDestinationLink())) { 
			ProjectEntity newProject = new ProjectEntity();
			newProject.setName(req.getProject().getName());
			newProject.setDescription(req.getProject().getDescription());
			newProject.setDestinationLink(req.getProject().getDestinationLink());
			// TODO: settare le date qui o a db...? Decidiamo
			return projectRepository.save(newProject);
		} 
		else {
			throw new IllegalArgumentException("Project with name " + req.getProject().getName() + "and destination " + req.getProject().getDestinationLink() + " already exists.");
		}
			
		
	}

	@Override
	public List<RequestDetail> filterRequest(RequestFilterCriteria criteria) {
		// Utilizzo la Specification per costruire la query dinamicamente
		List<RequestEntity> entities = requestRepository.findAll(RequestSpecification.withFilters(criteria));
		return testRequestMapper.toModelList(entities);
	}

}
