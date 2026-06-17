package com.accenture.ra.service;
import com.accenture.ra.entity.ParamEntity;
import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.entity.ServiceTypeEntity;
import com.accenture.ra.model.ParamDetail;
import com.accenture.ra.model.ServiceDetail;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public final class ParamMapper {

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
}