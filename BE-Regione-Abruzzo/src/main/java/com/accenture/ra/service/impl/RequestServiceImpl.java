package com.accenture.ra.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import com.accenture.ra.entity.*;
import com.accenture.ra.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.dto.response.RequestDetailResponse;
import com.accenture.ra.mapper.ProjectMapper;
import com.accenture.ra.mapper.RequestMapper;
import com.accenture.ra.mapper.ServiceMapper;
import com.accenture.ra.mapper.ServiceTypeMapper;
import com.accenture.ra.mapper.StateMapper;
import com.accenture.ra.request.RequestCreationRequest;
import com.accenture.ra.request.RequestFilterCriteria;
import com.accenture.ra.service.RequestService;
import com.accenture.ra.utils.RequestIdGenerator;
import com.accenture.ra.utils.RequestSpecification;

import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

	private final RequestRepository requestRepository;
	private final ProjectRepository projectRepository;
	private final ParamRepository paramRepository;
	private final ServiceTypeRepository categoryRepository;
	private final ServiceRepository serviceRepository;
	private final StateRepository stateRepository;
	private final RequestMapper requestMapper;
	private final ProjectMapper projectMapper;
	private final ServiceTypeMapper serviceTypeMapper;
	private final ServiceMapper serviceMapper;
	private final StateMapper stateMapper;
	private final ObjectMapper objectMapper;

	@Override
	public List<RequestDetail> getAllRequests() {
		List<RequestEntity> entity = requestRepository.findAll();

        return requestMapper.toModelList(entity);
	}

	@Override
	public RequestDetail getRequestById(String requestId) {
		RequestEntity requestEntity = requestRepository.findById(requestId).get();
        return requestMapper.toModel(requestEntity);
	}

	@Override
	public RequestDetailResponse createRequest(RequestCreationRequest req) {

		LocalDateTime now = LocalDateTime.now();

		RequestEntity requestEntity = new RequestEntity();
		requestEntity.setRequestId(RequestIdGenerator.generateId());
		requestEntity.setProject(createOrFindProject(req));

		StateEntity state = stateRepository.findByStateName(req.getState())
				.orElseThrow(() -> new RuntimeException("Stato non trovato: " + req.getState()));

		requestEntity.setState(state);

		requestEntity.setSendFrom(req.getSendFrom());
		requestEntity.setSendTo(req.getSendTo());
		requestEntity.setCreatedAt(now);
		requestEntity.setUpdatedAt(now);

		requestEntity.setNote(req.getNote());

		//qui creo il payload della richiesta
		requestEntity.setRequestPayload(createPayload(req));

		if (req.getServices() != null && !req.getServices().isEmpty()) {

			List<RequestServiceEntity> requestServices = req.getServices()
					.stream()
					.map(serviceReq -> {

						ServiceEntity serviceEntity = serviceRepository.findById(serviceReq.getId().toString())
								.orElseThrow(() -> new RuntimeException(
										"Service non trovato con id: " + serviceReq.getId()
								));

						RequestServiceEntity requestServiceEntity = new RequestServiceEntity();
						requestServiceEntity.setRequest(requestEntity);
						requestServiceEntity.setService(serviceEntity);

						log.info(serviceReq.toString());

						if (serviceReq.getParams() != null && !serviceReq.getParams().isEmpty()) {

							List<RequestServiceParamEntity> params = serviceReq.getParams()
									.stream()
									.map(paramReq -> {

										ParamEntity paramEntity = paramRepository.findById(paramReq.getId())
												.orElseThrow(() -> new RuntimeException(
														"Parametro non trovato con id: " + paramReq.getId()
												));

										RequestServiceParamEntity requestServiceParamEntity =
												new RequestServiceParamEntity();

										requestServiceParamEntity.setRequestService(requestServiceEntity);
										requestServiceParamEntity.setParam(paramEntity);
										requestServiceParamEntity.setCreatedAt(now);
										requestServiceParamEntity.setUpdatedAt(now);

										return requestServiceParamEntity;
									})
									.toList();

							requestServiceEntity.setParams(params);
						}

						return requestServiceEntity;
					})
					.toList();

			requestEntity.setRequestServices(requestServices);
		}

		RequestEntity saved = requestRepository.save(requestEntity);

		RequestDetailResponse response = new RequestDetailResponse();
		response.setRequestDetail(requestMapper.toModel(saved));
		return response;
	}

	private String createPayload(RequestCreationRequest req) {
		try {
			return objectMapper.writeValueAsString(req);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("Errore nella serializzazione del payload richiesta", e);
		}
    }

	// Alla creazione di una request, se il progetto non esiste lo creo, altrimenti lo recupero dal db
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
		return requestMapper.toModelList(entities);
	}

}
