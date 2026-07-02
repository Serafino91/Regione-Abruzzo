package com.accenture.ra.response;

import com.accenture.ra.model.ProjectDetail;

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

