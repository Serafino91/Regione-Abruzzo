package com.accenture.ra.mapper;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.dto.response.LightUserResponse;
import com.accenture.ra.dto.response.ProjectDetailResponse;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.entity.Delegates;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    UserResponse toUserResponse(User entity);

    List<UserResponse> toDtoList(List<User> users);

    // Map delegatedBy to the shallow summary DTO (no delegates list = no loop!)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "delegatedBy", source = "delegatedBy")
    DelegationResponse toDelegationResponse(Delegates delegate);

    LightUserResponse toLightUserResponse(User entity);

    @Mapping(target = "projectDetail", expression = "java(toProjectDetail(entity))")
    ProjectDetailResponse toProjectResponse(ProjectEntity entity);

    @Mapping(source = "createdAt", target = "createAt")
    @Mapping(source = "updatedAt", target = "updateAt")
    ProjectDetail toProjectDetail(ProjectEntity entity);

    List<ProjectDetailResponse> toProjectResponseList(List<ProjectEntity> entities);
}