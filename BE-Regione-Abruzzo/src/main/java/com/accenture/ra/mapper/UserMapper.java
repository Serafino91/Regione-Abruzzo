package com.accenture.ra.mapper;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.response.DelegationResponse;
import com.accenture.ra.dto.response.LightUserResponse;
import com.accenture.ra.dto.response.ProjectDetailResponse;
import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.entity.DelegationEntity;
import com.accenture.ra.entity.ProjectEntity;
import com.accenture.ra.entity.UserEntity;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    UserResponse toUserResponse(UserEntity entity);

    List<UserResponse> toDtoList(List<UserEntity> userEntities);

    @Mapping(target = "delegatedUser", ignore = true)
    @Mapping(target = "delegatedBy", source = "delegatedBy")
    DelegationResponse toDelegationResponse(DelegationEntity delegate);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "fiscalCode", source = "fiscalCode")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "email", source = "email")
    LightUserResponse toLightUserResponse(UserEntity entity);

    @Mapping(target = "projectDetail", expression = "java(toProjectDetail(entity))")
    ProjectDetailResponse toProjectResponse(ProjectEntity entity);

    @Mapping(source = "createdAt", target = "createAt")
    @Mapping(source = "updatedAt", target = "updateAt")
    ProjectDetail toProjectDetail(ProjectEntity entity);

    List<ProjectDetailResponse> toProjectResponseList(List<ProjectEntity> entities);
}