package com.accenture.ra.service;

import com.accenture.ra.entity.ServiceTypeEntity;
import com.accenture.ra.entity.StateEntity;
import com.accenture.ra.model.ServiceType;
import com.accenture.ra.model.StateDetail;

import java.util.List;

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
}
