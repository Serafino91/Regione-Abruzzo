package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.dto.response.TicketModel;
import com.accenture.ra.dto.response.TicketStateModel;

public interface IncidentService {

	public List<TicketStateModel> getAllIncident();

	public TicketModel getIncidentDetail(String ticketCode);
}
