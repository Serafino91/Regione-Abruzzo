package com.accenture.ra.response;

import java.util.List;

import com.accenture.ra.model.RequestDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestListResponse {
	private List<RequestDetail> requestsList;
}
