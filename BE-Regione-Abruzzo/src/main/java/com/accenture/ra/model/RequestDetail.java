package com.accenture.ra.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestDetail {

	private String requestId;
	private ProjectDetail project;
	private StateDetail state;
	private List<ServiceDetail> services;
	private ServiceType category;
	private LocalDateTime sendFrom;
	private LocalDateTime sendTo;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
