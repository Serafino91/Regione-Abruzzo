package com.accenture.ra.service;
import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.entity.ServiceTypeEntity;
import com.accenture.ra.model.ServiceDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public final class ServiceMapper {

    private ServiceMapper() {
    }

    public static ServiceDetail toModel(ServiceEntity entity) {
        if (entity == null) {
            return null;
        }

        return ServiceDetail.builder()
                .id(entity.getId())
                .type(entity.getServiceType().getName())
                .item(entity.getName())
                .base(entity.getIsBase())
                .optional(entity.getIsOptional())
                .params(ParamMapper.toModelList(entity.getParams()))
//                .vcpu(entity.getVcpu())
//                .vramGb(entity.getVramGb())
//                .storageGb(entity.getStorageGb())
//                .minimumTechnicalFeatures(entity.getMinimumTechnicalFeatures())
//                .quantity(entity.getQuantity())
//                .durationMonths(entity.getDurationMonths())
                .build();
    }

    public static ServiceEntity toEntity(ServiceDetail model) {
        if (model == null) {
            return null;
        }

        ServiceEntity entity = new ServiceEntity();
        entity.setId(model.getId());
        entity.setServiceType(new ServiceTypeEntity("index", model.getType(), "Description")); //TODO da riscrivere
        entity.setName(model.getItem());
        entity.setIsBase(model.getBase());
        entity.setIsOptional(model.getOptional());
//        entity.setVcpu(model.getVcpu());
//        entity.setVramGb(model.getVramGb());
//        entity.setStorageGb(model.getStorageGb());
//        entity.setMinimumTechnicalFeatures(model.getMinimumTechnicalFeatures());
//        entity.setQuantity(model.getQuantity());
//        entity.setDurationMonths(model.getDurationMonths());
//
        return entity;
    }

    public static List<ServiceDetail> toModelList(List<ServiceEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(ServiceMapper::toModel)
                .toList();
    }

    public static List<ServiceEntity> toEntityList(List<ServiceDetail> models) {
        if (models == null) {
            return List.of();
        }

        return models.stream()
                .map(ServiceMapper::toEntity)
                .toList();
    }
}