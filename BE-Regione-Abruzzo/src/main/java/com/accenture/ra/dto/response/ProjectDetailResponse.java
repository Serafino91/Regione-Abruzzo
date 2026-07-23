package com.accenture.ra.dto.response;

import com.accenture.ra.dto.request.ProjectDetail;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProjectDetailResponse {
        private ProjectDetail projectDetail;
}

