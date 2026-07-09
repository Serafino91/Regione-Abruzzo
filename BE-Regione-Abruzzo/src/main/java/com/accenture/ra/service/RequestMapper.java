package com.accenture.ra.service;

import com.accenture.ra.dto.request.RequestDetail;
import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.mapper.ProjectMapper;
import com.accenture.ra.mapper.ServiceMapper;
import com.accenture.ra.mapper.ServiceTypeMapper;
import com.accenture.ra.mapper.StateMapper;

import java.util.List;

public class RequestMapper {

	private RequestMapper() {
		
	}
	
	public static RequestDetail toModel(RequestEntity entity) {
        if (entity == null) {
            return null;
        }

        return RequestDetail.builder()
                .requestId(entity.getRequestId())
                .project(ProjectMapper.toModel(entity.getProject()))
                .services(ServiceMapper.toModelList(entity.getServices()))
                .category(ServiceTypeMapper.toModel(entity.getCategory()))
                .state(StateMapper.toModel(entity.getState()))
                .sendFrom(entity.getSendFrom())
                .sendTo(entity.getSendTo())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static List<RequestDetail> toModelList(List<RequestEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(RequestMapper::toModel)
                .toList();
    }
}
