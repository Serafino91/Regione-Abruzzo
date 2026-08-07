package com.accenture.ra.dto.request;

import java.time.LocalDateTime;
import java.util.List;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.request.ServiceDetail;
import com.accenture.ra.dto.request.ServiceType;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestCreationRequest {
	
	@NotNull
	private ProjectDetail project;
	private String state;
	private String note;
	private String requestPayload;
	@NotNull
	private List<ServiceDetail> services;
	private LocalDateTime sendFrom;
	private LocalDateTime sendTo;

//	private ServiceType category;
	// queste vengono gestite a codice
	//	private LocalDateTime createdAt;
	//	private LocalDateTime updatedAt;
}
