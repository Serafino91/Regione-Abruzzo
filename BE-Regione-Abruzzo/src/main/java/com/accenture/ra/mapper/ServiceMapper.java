package com.accenture.ra.mapper;
import java.util.List;

import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.model.ServiceDetail;
import com.accenture.ra.repository.ServiceTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public final class ServiceMapper {
	
	@Autowired
	private static ServiceTypeRepository serviceTypeRepository;

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
                .paramsList(ParamListMapper.toModelList(entity.getParamList()))
                .build();
    }

    
    public static ServiceEntity toEntity(ServiceDetail model) {
        if (model == null) return null;

        return ServiceEntity.builder()
                .id(model.getId())
                .name(model.getName())
                .isBase(model.getBase())
                .isOptional(model.getOptional())
//                .paramListId(model.getParamsList()) //TODO: riferito alla tabella param_list 
                .paramList(ParamListMapper.toEntityList(model.getParamsList()))
                .serviceType(serviceTypeRepository.findByType(model.getType())) // RECUPERO CON REPO
//                .projects(model.get()) // add a model? 
                .params(ParamMapper.toEntityList(model.getParams()))
                .build();
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