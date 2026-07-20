package com.accenture.ra.mapper;

import com.accenture.ra.dto.request.ServiceType;
import com.accenture.ra.entity.ServiceTypeEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ServiceTypeMapper {

    ServiceType toModel(ServiceTypeEntity entity);

    List<ServiceType> toModelList(List<ServiceTypeEntity> entities);

    ServiceTypeEntity toEntity(ServiceType model);

    List<ServiceTypeEntity> toEntityList(List<ServiceType> models);

}
