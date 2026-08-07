package com.accenture.ra.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "request")
public class RequestEntity {

    @Id
    @Column(name = "request_id", length = 55)
    private String requestId;

    @Column(name = "send_from", nullable = false)
    private LocalDateTime sendFrom;

    @Column(name = "send_to", nullable = false)
    private LocalDateTime sendTo;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectEntity project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_state_id", nullable = false)
    private StateEntity state;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @Column(name = "request_payload", columnDefinition = "JSON")
    private String requestPayload;

    @OneToMany(
            mappedBy = "request",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<RequestServiceEntity> requestServices;
}