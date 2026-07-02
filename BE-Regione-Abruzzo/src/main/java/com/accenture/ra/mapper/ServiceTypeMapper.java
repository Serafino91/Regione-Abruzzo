package com.accenture.ra.mapper;

import java.util.List;

import com.accenture.ra.entity.ParamEntity;
import com.accenture.ra.entity.ServiceTypeEntity;
import com.accenture.ra.model.ParamDetail;
import com.accenture.ra.model.ServiceType;

public class ServiceTypeMapper {

	private ServiceTypeMapper() {
	}
	
    public static ServiceType toModel(ServiceTypeEntity entity) {
        if (entity == null) {
            return null;
        }

        return ServiceType.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .build();
    }


    public static List<ServiceType> toModelList(List<ServiceTypeEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(ServiceTypeMapper::toModel)
                .toList();
    }
    
    public static ServiceTypeEntity toEntity(ServiceType model) {
        if (model == null) return null;

        return ServiceTypeEntity.builder()
                .id(model.getId())
                .name(model.getName())
                .description(model.getDescription())
                .build();
    }
}
