package com.accenture.ra.service;

import com.accenture.ra.entity.Ticket;
import com.accenture.ra.model.TicketPayload;

public interface TicketService {

    Ticket processAndDeliverTicket(TicketPayload payload);
}