package com.accenture.ra.dto.response;

import com.accenture.ra.dto.request.ProjectDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectListResponse {
    private List<ProjectDetail> projectsList;
}
