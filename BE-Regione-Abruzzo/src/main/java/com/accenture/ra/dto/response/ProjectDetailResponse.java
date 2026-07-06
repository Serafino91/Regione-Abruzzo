package com.accenture.ra.dto.response;

import com.accenture.ra.dto.request.ProjectDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDetailResponse {

        private ProjectDetail serviceDetail;
}

