package com.accenture.ra.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.ra.dto.response.TicketModel;
import com.accenture.ra.dto.response.TicketStateModel;
import com.accenture.ra.entity.TicketEntity;
import com.accenture.ra.entity.TicketStateEntity;
import com.accenture.ra.mapper.TicketMapper;
import com.accenture.ra.mapper.TicketStateMapper;
import com.accenture.ra.repository.TicketRepository;
import com.accenture.ra.repository.TicketStateRepository;
import com.accenture.ra.service.IncidentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncidentServiceImpl implements IncidentService {

	 private final TicketStateMapper ticketStateMapper;
	 private final TicketMapper ticketMapper;

	 @Autowired
	 private TicketStateRepository ticketStateRepository;
	 @Autowired
	 private TicketRepository ticketRepository;


	@Override
	public List<TicketStateModel> getAllIncident() {
		List<TicketStateEntity> tickets = ticketStateRepository.findAll();
		return ticketStateMapper.toModelList(tickets);
	}
	
	@Override
	public TicketModel getIncidentDetail(String ticketCode) {
		TicketEntity ticket = ticketRepository.findByCode(ticketCode);
		return ticketMapper.toModel(ticket);
	}
}
