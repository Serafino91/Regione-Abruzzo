package com.accenture.ra.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Data
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uuid;
    private String hostName;
    private String message;
    private String status; // "PENDING", "PROCESSING", "PROCESSED", "FAILED"
    private Instant createdAt;


}
