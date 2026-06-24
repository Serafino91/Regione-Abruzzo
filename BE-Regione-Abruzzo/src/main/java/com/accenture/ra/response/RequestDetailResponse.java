package com.accenture.ra.response;

import com.accenture.ra.model.RequestDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestDetailResponse {

	private RequestDetail requestDetail;
}
