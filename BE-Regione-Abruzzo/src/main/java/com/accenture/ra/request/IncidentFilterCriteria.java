package com.accenture.ra.request;

import java.time.LocalDateTime;

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
public class IncidentFilterCriteria {
    private String code;
    private String category;
    private String subcategory;
    private Long stateId;
    private LocalDateTime openingDateFrom;
    private LocalDateTime openingDateTo;
    private String applicant;
}
