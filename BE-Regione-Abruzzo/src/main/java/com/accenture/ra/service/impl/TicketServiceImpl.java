package com.accenture.ra.service.impl;

import com.accenture.ra.service.TicketService;
import com.accenture.ra.client.RaTicketClient;
import com.accenture.ra.entity.Ticket;
import com.accenture.ra.model.TicketPayload;
import com.accenture.ra.repository.TicketRepository;
import com.accenture.ra.mapper.TicketMapper; // <-- 1. Import your Mapper
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.UUID;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository repository;
    private final RaTicketClient raTicketClient;
    private final TicketMapper ticketMapper; // <-- 2. Add field variable

    // 3. Inject it via the constructor
    public TicketServiceImpl(TicketRepository repository, RaTicketClient raTicketClient, TicketMapper ticketMapper) {
        this.repository = repository;
        this.raTicketClient = raTicketClient;
        this.ticketMapper = ticketMapper;
    }

    @Transactional
    @Override
    public Ticket processAndDeliverTicket(TicketPayload payload) {
        // 4. Use MapStruct to extract 'message' and 'hostName' automatically
        Ticket ticket = ticketMapper.toEntity(payload);

        // 5. Apply your custom backend modifications manually over it
        ticket.setUuid(UUID.randomUUID().toString());
        ticket.setHostName(payload.hostName() + " - " + payload.tag().tag()); // Your custom logic
        ticket.setStatus("PROCESSING");
        ticket.setCreatedAt(Instant.now()); // Populates the createdAt timestamp!

        // Save initial state to DB
        ticket = repository.save(ticket);

        try {
            // raTicketClient.createTicket(payload); // Commented out for local test
            ticket.setStatus("PROCESSED");
        } catch (Exception e) {
            ticket.setStatus("FAILED");
            repository.save(ticket);
            throw new RuntimeException("External RATicket delivery failed: " + e.getMessage(), e);
        }

        return repository.save(ticket);
    }
}