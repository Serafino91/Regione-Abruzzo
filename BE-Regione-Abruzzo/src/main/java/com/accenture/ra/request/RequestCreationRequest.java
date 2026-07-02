package com.accenture.ra.request;

import java.time.LocalDateTime;
import java.util.List;

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
	private String project;
	@NotNull
	private String state;
	@NotNull
	private List<String> services;
	@NotNull
	private String category;
	@NotNull
	private LocalDateTime sendFrom;
	@NotNull
	private LocalDateTime sendTo;
	
	// queste vengono gestite a codice
	//	private LocalDateTime createdAt;
	//	private LocalDateTime updatedAt;
}
