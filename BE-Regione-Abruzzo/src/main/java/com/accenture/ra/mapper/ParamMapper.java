package com.accenture.ra.mapper;
import java.util.List;

import com.accenture.ra.entity.ParamEntity;
import com.accenture.ra.model.ParamDetail;
import com.accenture.ra.repository.ServiceRepository;

import org.springframework.beans.factory.annotation.Autowired;


public final class ParamMapper {
	
	@Autowired
	private static ServiceRepository serviceRepository;
	
    private ParamMapper() {
    }

    public static ParamDetail toModel(ParamEntity entity) {
        if (entity == null) {
            return null;
        }

        return ParamDetail.builder()
                .id(entity.getId())
                .name(entity.getName())
                .paramType(entity.getParamType())
                .minValue(entity.getMinValue())
                .maxValue(entity.getMinValue())
                .isRequired(entity.isRequired())
                .build();
    }


    public static List<ParamDetail> toModelList(List<ParamEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(ParamMapper::toModel)
                .toList();
    }
    

    public static ParamEntity toEntity(ParamDetail model) {
        if (model == null) return null;
        
        return ParamEntity.builder()
                .id(model.getId())
                .name(model.getName())
                .paramType(model.getParamType())
                .minValue(model.getMinValue())
                .maxValue(model.getMaxValue())
                .isRequired(model.isRequired())
                .service(serviceRepository.findById(model.getServiceId()).orElse(null)) // TODO: gestire meglio il secondo caso?
                .build();	
    }
    
    public static List<ParamEntity> toEntityList(List<ParamDetail> models) {
        if (models == null) {
            return List.of();
        }

        return models.stream()
                .map(ParamMapper::toEntity)
                .toList();
    }
}