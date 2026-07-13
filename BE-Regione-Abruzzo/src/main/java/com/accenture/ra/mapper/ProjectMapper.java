package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.entity.ProjectEntity;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    ProjectDetail toModel(ProjectEntity entity);

    List<ProjectDetail> toModelList(List<ProjectEntity> entities);

    ProjectEntity toEntity(ProjectDetail model);

    List<ProjectEntity> toEntityList(List<ProjectDetail> models);

}
