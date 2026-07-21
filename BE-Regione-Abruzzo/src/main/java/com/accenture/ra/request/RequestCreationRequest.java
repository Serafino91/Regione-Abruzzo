package com.accenture.ra.request;

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
	@NotNull
	private List<ServiceDetail> services;
	private ServiceType category;
	private LocalDateTime sendFrom;
	private LocalDateTime sendTo;
	
	// queste vengono gestite a codice
	//	private LocalDateTime createdAt;
	//	private LocalDateTime updatedAt;
}
