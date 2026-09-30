package com.accenture.ra.entity;

import jakarta.persistence.*;
        import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "ticket_state")
@SQLDelete(sql = "UPDATE ticket_state SET deleted = true WHERE id=?")
@SQLRestriction("deleted = false")
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
    @Column(name = "deleted", nullable = false)
    @Builder.Default
    private boolean deleted = false;

}