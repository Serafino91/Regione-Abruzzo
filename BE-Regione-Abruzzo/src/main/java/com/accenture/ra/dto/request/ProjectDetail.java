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
public class ProjectDetail {

    private Long id;
    private String name;
    private String destinationLink;
    private String description;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private List<ServiceDetail> services;
}
