package com.accenture.ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.accenture.ra.entity.TicketStateEntity;

@Repository
public interface TicketStateRepository extends JpaRepository<TicketStateEntity, String> {

}
