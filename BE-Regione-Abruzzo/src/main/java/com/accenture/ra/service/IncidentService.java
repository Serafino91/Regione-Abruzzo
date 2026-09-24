package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.dto.response.TicketModel;
import com.accenture.ra.request.IncidentFilterCriteria;

public interface IncidentService {

	public List<TicketModel> getAllIncident();

	public TicketModel getIncidentDetail(String ticketCode);
	
	public List<TicketModel> filterIncident(IncidentFilterCriteria criteria);
}
