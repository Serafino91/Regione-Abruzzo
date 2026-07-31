package com.accenture.ra.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.ra.dto.response.TicketModel;
import com.accenture.ra.entity.TicketEntity;
import com.accenture.ra.mapper.TicketMapper;
import com.accenture.ra.repository.TicketRepository;
import com.accenture.ra.service.IncidentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncidentServiceImpl implements IncidentService {

	 private final TicketMapper ticketMapper;

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
}
