package com.accenture.ra.controller;



import com.accenture.ra.entity.Ticket;
import com.accenture.ra.model.TicketPayload;
import com.accenture.ra.repository.TicketRepository;
import com.accenture.ra.service.impl.TicketServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketServiceImpl ticketServiceImpl;
    private final TicketRepository repository;

    // Standard constructor injection for best practice
    public TicketController(TicketServiceImpl ticketServiceImpl, TicketRepository repository) {
        this.ticketServiceImpl = ticketServiceImpl;
        this.repository = repository;
    }

    // POST: Delivers payload directly via client-service loop and returns the DB Entity
    @PostMapping
    public ResponseEntity<Ticket> createAndDeliver(@RequestBody TicketPayload payload) {
        Ticket processedTicket = ticketServiceImpl.processAndDeliverTicket(payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(processedTicket);
    }

    // GET: Traditional fetch from database for later lookups
    @GetMapping("/{uuid}")
    public ResponseEntity<Ticket> getTicket(@PathVariable String uuid) {
        return repository.findByUuid(uuid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}