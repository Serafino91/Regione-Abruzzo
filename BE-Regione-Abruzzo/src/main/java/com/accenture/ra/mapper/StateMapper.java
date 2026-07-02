package com.accenture.ra.mapper;

import java.util.List;

import com.accenture.ra.entity.StateEntity;
import com.accenture.ra.model.StateDetail;

public class StateMapper {

	private StateMapper() {
	}
	
    public static StateDetail toModel(StateEntity entity) {
        if (entity == null) {
            return null;
        }

        return StateDetail.builder()
                .id(entity.getId())
                .stateName(entity.getStateName())
                .build();
    }


    public static List<StateDetail> toModelList(List<StateEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(StateMapper::toModel)
                .toList();
    }
    
    
    public static StateEntity toEntity(StateDetail model) {
        if (model == null) return null;

        return StateEntity.builder()
                .id(model.getId())
                .stateName(model.getStateName())
                .build();
    }
    
    public static List<StateEntity> toEntityList(List<StateDetail> models) {
        if (models == null) {
            return List.of();
        }

        return models.stream()
                .map(StateMapper::toEntity)
                .toList();
    }
}
