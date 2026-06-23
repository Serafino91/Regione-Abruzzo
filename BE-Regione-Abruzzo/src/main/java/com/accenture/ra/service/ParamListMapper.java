package com.accenture.ra.service;
import com.accenture.ra.entity.ParamEntity;
import com.accenture.ra.entity.ParamListEntity;
import com.accenture.ra.model.ParamDetail;
import com.accenture.ra.model.ParamList;

import java.util.List;


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
}