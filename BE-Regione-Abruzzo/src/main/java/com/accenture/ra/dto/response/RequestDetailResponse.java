package com.accenture.ra.dto.response;

import com.accenture.ra.dto.request.RequestDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestDetailResponse {

	private RequestDetail requestDetail;
}
