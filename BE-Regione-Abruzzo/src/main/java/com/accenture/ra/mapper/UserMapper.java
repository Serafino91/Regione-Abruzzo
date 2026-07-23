package com.accenture.ra.mapper;

import com.accenture.ra.dto.response.UserResponse;
import com.accenture.ra.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    UserResponse toUserResponse(User entity);
}