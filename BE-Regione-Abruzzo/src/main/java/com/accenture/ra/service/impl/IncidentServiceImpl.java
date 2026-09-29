package com.accenture.ra.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.ra.dto.response.TicketDetailResponse;
import com.accenture.ra.dto.response.TicketModel;
import com.accenture.ra.entity.TicketEntity;
import com.accenture.ra.exceptions.CMPException;
import com.accenture.ra.exceptions.TipoErroreBase;
import com.accenture.ra.mapper.TicketCategoryMapper;
import com.accenture.ra.mapper.TicketMapper;
import com.accenture.ra.mapper.TicketStateMapper;
import com.accenture.ra.repository.TicketRepository;
import com.accenture.ra.request.IncidentCreationRequest;
import com.accenture.ra.request.IncidentFilterCriteria;
import com.accenture.ra.service.IncidentService;
import com.accenture.ra.utils.IncidentSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncidentServiceImpl implements IncidentService {

	 private final TicketMapper ticketMapper;
	 private final TicketCategoryMapper ticketCategoryMapper;
	 private final TicketStateMapper ticketStateMapper;
	 
	 @Autowired
	 private TicketRepository ticketRepository;


	@Override
	public List<TicketModel> getAllIncident() {
		List<TicketEntity> tickets = ticketRepository.findAll();
		return ticketMapper.toModelList(tickets);
	}
	
	@Override
	public TicketModel getIncidentDetail(String ticketCode) {
		TicketEntity ticket = ticketRepository.findByCode(ticketCode);
		return ticketMapper.toModel(ticket);
	}
	
	@Override
	public List<TicketModel> filterIncident(IncidentFilterCriteria criteria) {
	    List<TicketEntity> entities = ticketRepository.findAll(IncidentSpecification.withFilters(criteria));
	    return ticketMapper.toModelList(entities);
	}

	@Override
	public TicketDetailResponse createIncident(IncidentCreationRequest req) {

		if(req != null) {
			LocalDateTime now = LocalDateTime.now();
			TicketEntity ticketEntity = new TicketEntity();
			ticketEntity.setCode(req.getCode());
			ticketEntity.setState(ticketStateMapper.toEntity(req.getState()));
			ticketEntity.setCategory(ticketCategoryMapper.toEntity(req.getCategory()));
			ticketEntity.setSubcategory(req.getSubcategory());
			ticketEntity.setOpeningDate(req.getOpeningDate());
			ticketEntity.setApplicant(req.getApplicant());
			ticketEntity.setCreatedAt(now);
			ticketEntity.setUpdatedAt(now);

			ticketRepository.save(ticketEntity);
			
			TicketDetailResponse response = new TicketDetailResponse();
			response.setTicketDetail(ticketMapper.toModel(ticketEntity));
			return response;
			
		} else {
			throw new CMPException("Richiesta non valida", TipoErroreBase.VALIDAZIONE);
		}

	}
}
