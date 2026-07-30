package com.accenture.ra.service.impl;

import com.accenture.ra.dto.request.ServiceType;
import com.accenture.ra.dto.response.TicketModel;
import com.accenture.ra.entity.ServiceTypeEntity;
import com.accenture.ra.entity.TicketEntity;
import com.accenture.ra.mapper.ServiceTypeMapper;
import com.accenture.ra.mapper.TicketMapper;
import com.accenture.ra.repository.ServiceTypeRepository;
import com.accenture.ra.repository.TicketRepository;
import com.accenture.ra.service.IncidentService;
import com.accenture.ra.service.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidentServiceImp implements IncidentService {

	 private final TicketMapper ticketMapper;

	 @Autowired
	 private TicketRepository ticketRepository;


	@Override
	public List<TicketModel> getAllIncident() {
		List<TicketEntity> tickets = ticketRepository.findAll();
		return ticketMapper.toModelList(tickets);
	}
}
