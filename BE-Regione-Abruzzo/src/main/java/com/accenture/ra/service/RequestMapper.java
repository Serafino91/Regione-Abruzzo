package com.accenture.ra.service;

import java.util.List;

import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.model.RequestDetail;

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
                .service(ServiceMapper.toModel(entity.getService()))
                .category(ServiceTypeMapper.toModel(entity.getCategory()))
//              .state(entity.getState()) //TODO
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
