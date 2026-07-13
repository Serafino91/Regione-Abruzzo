package com.accenture.ra.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.accenture.ra.dto.request.ServiceDetail;
import com.accenture.ra.entity.ServiceEntity;

@Mapper(componentModel = "spring", uses = {ParamMapper.class, ParamListMapper.class, ServiceTypeMapper.class})
public interface ServiceMapper {

	@Mapping(source = "isBase", target = "base")
	@Mapping(source = "isOptional", target = "optional")
	@Mapping(source = "serviceType.name", target = "type")
	@Mapping(source = "paramList", target = "paramsList")
	@Mapping(source = "params", target = "params")
    ServiceDetail toModel(ServiceEntity entity);

    List<ServiceDetail> toModelList(List<ServiceEntity> entities);

    ServiceEntity toEntity(ServiceDetail model);

    List<ServiceEntity> toEntityList(List<ServiceDetail> models);

}
