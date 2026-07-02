package com.accenture.ra.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectPatchRequest {
    private Long id;
    private String name;
    private String destinationLink;
    private String description;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
