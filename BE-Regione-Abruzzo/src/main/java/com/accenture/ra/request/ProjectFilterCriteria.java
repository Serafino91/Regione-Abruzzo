package com.accenture.ra.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectFilterCriteria {
    private Long projectId;

    private String name;
}
