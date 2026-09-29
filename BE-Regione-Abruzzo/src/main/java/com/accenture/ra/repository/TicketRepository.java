package com.accenture.ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.accenture.ra.entity.TicketEntity;

@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, String>, JpaSpecificationExecutor<TicketEntity> {

	TicketEntity findByCode(String ticketCode);

}
