package com.accenture.ra.mapper;

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
    
    public static RequestEntity toEntity(RequestDetail model) {
        if (model == null) {
            return null;
        }

        RequestEntity entity = new RequestEntity();
        entity.setRequestId(model.getRequestId());
        entity.setSendFrom(model.getSendFrom());
        entity.setSendTo(model.getSendTo());
        entity.setCreatedAt(model.getCreatedAt());
        entity.setUpdatedAt(model.getUpdatedAt());
        entity.setProject(ProjectMapper.toEntity(model.getProject())); 
        entity.setState(StateMapper.toEntity(model.getState()));
        entity.setServices(ServiceMapper.toEntityList(model.getServices()));
        entity.setCategory(ServiceTypeMapper.toEntity(model.getCategory()));

        return entity;
    }
    public static List<RequestEntity> toEntityList(List<RequestDetail> models) {
        if (models == null) {
            return List.of();
        }

        return models.stream()
                .map(RequestMapper::toEntity)
                .toList();
    }
}
