package com.accenture.ra.mapper;

import com.accenture.ra.dto.request.CreateDelegationRequest;
import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.dto.response.ProjectDetailResponse;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.entity.Delegates;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.User;
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
    @Mapping(target = "active", expression = "java(targetUser.isActive() && targetUser.getAccreditationStatus() == AccreditationStatus.APPROVATO)")
    Delegates toEntity(CreateDelegationRequest request, User targetUser, User delegator, List<ProjectEntity> projects);

    DelegationResponse toResponse(Delegates entity);

    UserResponse toUserResponse(User entity);

    @Mapping(target = "projectDetail", source = ".")
    ProjectDetailResponse toProjectResponse(ProjectEntity entity);

    // ADD THIS METHOD: Forces MapStruct to use toProjectResponse() when converting lists
    List<ProjectDetailResponse> toProjectResponseList(List<ProjectEntity> entities);

    @Mapping(source = "createdAt", target = "createAt")
    @Mapping(source = "updatedAt", target = "updateAt")
    ProjectDetail toProjectDetail(ProjectEntity entity);

    List<DelegationResponse> toResponseList(List<Delegates> entities);
}