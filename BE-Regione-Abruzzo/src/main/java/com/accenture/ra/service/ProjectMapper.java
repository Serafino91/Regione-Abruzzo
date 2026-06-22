package com.accenture.ra.service;

import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.model.ProjectDetail;

import java.util.List;

public class ProjectMapper {
    private ProjectMapper() {
    }

    public static ProjectDetail toModel(ProjectEntity entity) {
        if (entity == null) {
            return null;
        }

        return ProjectDetail.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .destinationLink(entity.getDestinationLink())
                .createAt(entity.getCreatedAt())
                .updateAt(entity.getUpdatedAt())
                .build();
    }

    public static List<ProjectDetail> toModelList(List<ProjectEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(ProjectMapper::toModel)
                .toList();
    }

}
