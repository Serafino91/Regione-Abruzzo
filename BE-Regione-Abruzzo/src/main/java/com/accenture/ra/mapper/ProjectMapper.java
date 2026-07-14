package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.entity.ProjectEntity;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

	@Mapping(source = "createdAt", target = "createAt")
	@Mapping(source = "updatedAt", target = "updateAt")
    ProjectDetail toModel(ProjectEntity entity);

    List<ProjectDetail> toModelList(List<ProjectEntity> entities);

    @Mapping(source = "createAt", target = "createdAt")
	@Mapping(source = "updateAt", target = "updatedAt")
    ProjectEntity toEntity(ProjectDetail model);

    List<ProjectEntity> toEntityList(List<ProjectDetail> models);

}
