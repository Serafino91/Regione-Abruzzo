package com.accenture.ra.repository;

import com.accenture.ra.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    // Find tickets that haven't been picked up by our consumer yet
    List<Ticket> findByStatus(String status);

    // Used by your GET endpoint
    Optional<Ticket> findByUuid(String uuid);
}
