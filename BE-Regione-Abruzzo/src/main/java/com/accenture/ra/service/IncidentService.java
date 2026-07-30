package com.accenture.ra.service;

import com.accenture.ra.dto.request.ServiceType;
import com.accenture.ra.dto.response.TicketModel;

import java.util.List;

public interface IncidentService {

	public List<TicketModel> getAllIncident();

}
