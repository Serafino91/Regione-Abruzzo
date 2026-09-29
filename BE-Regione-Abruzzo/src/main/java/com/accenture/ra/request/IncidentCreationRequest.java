package com.accenture.ra.request;

import java.time.LocalDate;

import com.accenture.ra.dto.response.TicketCategoryModel;
import com.accenture.ra.dto.response.TicketStateModel;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncidentCreationRequest {

	//TODO: @NotNull sono ok?
	private String code;
    private TicketStateModel state;
    @NotNull
    private TicketCategoryModel category;
    private String subcategory;
    private LocalDate openingDate;
    @NotNull
    private String applicant;
}
