package com.accenture.ra.dto.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketModel {

    private Long id;

    private String code;

    private TicketStateModel state;

    private String category;

    private String subcategory;

    private LocalDate openingDate;

    private String applicant;
}