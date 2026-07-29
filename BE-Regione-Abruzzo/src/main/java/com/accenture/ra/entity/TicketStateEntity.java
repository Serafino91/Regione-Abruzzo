package com.accenture.ra.entity;

import jakarta.persistence.*;
        import lombok.*;

@Entity
@Table(name = "ticket_state")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketStateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "state_name", nullable = false, length = 100)
    private String stateName;
}