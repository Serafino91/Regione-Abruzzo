package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.dto.response.TicketModel;

public interface IncidentService {

	public List<TicketModel> getAllIncident();

	public TicketModel getIncidentDetail(String ticketCode);
}
