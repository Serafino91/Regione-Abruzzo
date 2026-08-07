package com.accenture.ra.dto.request;

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
	private String note;
	private String requestPayload;
	private List<ServiceDetail> services;
	private LocalDateTime sendFrom;
	private LocalDateTime sendTo;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
