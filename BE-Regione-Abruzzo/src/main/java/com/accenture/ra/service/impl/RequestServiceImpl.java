package com.accenture.ra.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.dto.response.RequestDetailResponse;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.entity.ServiceEntity;
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
import com.accenture.ra.dto.request.RequestCreationRequest;
import com.accenture.ra.dto.request.RequestFilterCriteria;
import com.accenture.ra.service.RequestService;
import com.accenture.ra.utils.RequestIdGenerator;
import com.accenture.ra.utils.RequestSpecification;

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
	private final RequestMapper requestMapper;
	private final ProjectMapper projectMapper;
	private final ServiceTypeMapper serviceTypeMapper;
	private final ServiceMapper serviceMapper;
	private final StateMapper stateMapper;


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

		// Costruiamo RequestEntity direttamente con riferimenti JPA gestiti,
		// evitando il mapper entity->entity che crea oggetti transient non gestiti da Hibernate
		RequestEntity requestEntity = new RequestEntity();
		requestEntity.setRequestId(RequestIdGenerator.generateId());
		requestEntity.setProject(createOrFindProject(req));

		stateRepository.findByStateName(req.getState())
				.ifPresent(requestEntity::setState);

		if (req.getServices() != null && !req.getServices().isEmpty()) {
			List<ServiceEntity> services = req.getServices().stream()
					.flatMap(s -> serviceRepository.findById(s.getId().toString()).stream())
					.collect(java.util.stream.Collectors.toList());
			requestEntity.setServices(services);

			// Deriva la category dal tipo del primo servizio
			if (!services.isEmpty() && services.get(0).getServiceType() != null) {
				requestEntity.setCategory(services.get(0).getServiceType());
			}
		}

		requestEntity.setSendFrom(req.getSendFrom());
		requestEntity.setSendTo(req.getSendTo());
		requestEntity.setCreatedAt(LocalDateTime.now());
		requestEntity.setUpdatedAt(LocalDateTime.now());

		RequestEntity saved = requestRepository.save(requestEntity);

		RequestDetailResponse response = new RequestDetailResponse();
		response.setRequestDetail(requestMapper.toModel(saved));
		return response;
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
