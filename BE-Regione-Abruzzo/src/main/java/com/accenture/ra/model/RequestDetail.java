package com.accenture.ra.model;

import java.time.LocalDateTime;

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
//	private StateDetail state; //TODO
	private ServiceDetail service;
	private ServiceType category;
	private LocalDateTime sendFrom;
	private LocalDateTime sendTo;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
