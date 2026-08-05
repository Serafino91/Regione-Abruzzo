package com.accenture.ra.mapper;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.response.DelegatedProjectsResponse;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.dto.response.ProjectDetailResponse;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.entity.DelegationEntity;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.UserEntity;
import com.accenture.ra.enums.AccreditationStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        imports = {LocalDateTime.class, AccreditationStatus.class}
)
public interface DelegationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "targetUser")
    @Mapping(target = "delegatedBy", source = "delegator")
    @Mapping(target = "delegateType", source = "request.delegateType")
    @Mapping(target = "projects", source = "projects")
    @Mapping(target = "delegationDate", expression = "java(LocalDateTime.now())")
    // Explicitly set active to false: delegation activates only upon RA Ticket resolution
    @Mapping(target = "active", constant = "false")
    DelegationEntity toEntity(CreateDelegationRequest request, UserEntity targetUserEntity, UserEntity delegator, List<ProjectEntity> projects);

    DelegationResponse toResponse(DelegationEntity entity);

    UserResponse toUserResponse(UserEntity entity);

    @Mapping(target = "projectDetail", source = ".")
    ProjectDetailResponse toProjectResponse(ProjectEntity entity);

    // Forces MapStruct to use toProjectResponse() when converting lists
    List<ProjectDetailResponse> toProjectResponseList(List<ProjectEntity> entities);

    @Mapping(source = "createdAt", target = "createAt")
    @Mapping(source = "updatedAt", target = "updateAt")
    ProjectDetail toProjectDetail(ProjectEntity entity);

    List<DelegationResponse> toResponseList(List<DelegationEntity> entities);

    @Mapping(source = "delegatedBy", target = "delegatedBy")
    @Mapping(source = "delegationDate", target = "delegationDate")
    @Mapping(source = "delegateType", target = "delegateType")
    @Mapping(source = "projects", target = "projects")
    DelegatedProjectsResponse toDelegatedProjectsResponse(DelegationEntity entity);

    List<DelegatedProjectsResponse> toDelegatedProjectsResponseList(List<DelegationEntity> entities);
}