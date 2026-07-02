package com.accenture.ra.mapper;
import java.util.ArrayList;
import java.util.List;

import com.accenture.ra.entity.ParamEntity;
import com.accenture.ra.entity.ParamListEntity;
import com.accenture.ra.model.ParamDetail;
import com.accenture.ra.model.ParamList;


public final class ParamListMapper {

    private ParamListMapper() {
    }

    public static ParamList toModel(ParamListEntity entity) {
        if (entity == null) {
            return null;
        }

        return ParamList.builder()
                .id(entity.getId())
                .idParam(entity.getIdParam())
                .build();
    }

    public static List<ParamList> toModelList(List<ParamListEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(ParamListMapper::toModel)
                .toList();
    }
    
    public static ParamListEntity toEntity(ParamList model) {
        if (model == null) return null;

        return ParamListEntity.builder()
                .id(model.getId())
                .idParam(model.getIdParam())
                .build();
         
    }
    
    public static List<ParamListEntity> toEntityList(List<ParamList> models) {
        if (models == null) {
            return List.of();
        }

        return models.stream()
                .map(ParamListMapper::toEntity)
                .toList();
    }
    
}