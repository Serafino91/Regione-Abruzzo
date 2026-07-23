package com.accenture.ra.mapper;

import com.accenture.ra.dto.request.ProjectDetail;
import com.accenture.ra.dto.response.DelegationResponse;
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
public interface DelegationMapper {

    DelegationResponse toResponse(Delegates entity);

    UserResponse toUserResponse(User entity);

    // Maps the ProjectEntity object into the nested projectDetail field
    @Mapping(target = "projectDetail", source = ".")
    ProjectDetailResponse toProjectResponse(ProjectEntity entity);

    // MapStruct uses this helper method to map ProjectEntity -> ProjectDetail
    ProjectDetail toProjectDetail(ProjectEntity entity);

    List<DelegationResponse> toResponseList(List<Delegates> entities);
}